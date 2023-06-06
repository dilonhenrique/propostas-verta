import { enqueueSnackbar } from "notistack"
import { propApi } from "../infra/propApi"
import store from "@/store";
import { setCliente } from "@/store/reducers/assinatura";

const asaasService = {
  loadClient: async (email, options = { silent: false }) => {
    const search = await asaasService.searchClient(email, options);

    if (search.found) {
      const cidade = await asaasService.searchCity(search.data.city);

      store.dispatch(setCliente({
        address: search.data.address,
        addressNumber: search.data.addressNumber,
        city: search.data.city,
        cityName: cidade,
        complement: search.data.complement,
        country: search.data.country,
        cpfCnpj: search.data.cpfCnpj,
        email: search.data.email,
        id: search.data.id,
        name: search.data.name,
        personType: search.data.personType,
        postalCode: search.data.postalCode,
        province: search.data.province,
        state: search.data.state,
        changed: false,
      }))
    }

    return search;
  },

  searchClient: async (email, options = { silent: false }) => {
    try {
      let conexao = await propApi(`asaas/customers?email=${email}`);
      const response = { ok: true }

      if (conexao.data.data.length > 0) {
        if (!options.silent) enqueueSnackbar('Cadastro encontrado!', { variant: 'success' });
        response.found = true;
        response.data = conexao.data.data[0];
      } else {
        if (!options.silent) enqueueSnackbar('Nenhum cadastro encontrado. Preencha seus dados');
        conexao.found = false;
      }
      return response;

    } catch (err) {
      if (!options.silent) enqueueSnackbar('Ops! Algo deu errado.', { variant: 'error' });
      console.log(err)
      return { ok: false, data: err };
    }
  },

  searchCity: async (id) => {
    try {
      const conexao = await propApi(`asaas/cities/${id}`);
      return conexao.data.name;
    } catch (err) {
      console.log(err);
    }
  },

  saveClient: async (cliente) => {
    let obj = {
      name: cliente.name,
      email: cliente.email,
      cpfCnpj: cliente.cpfCnpj,
      postalCode: cliente.postalCode,
      address: cliente.address,
      addressNumber: cliente.addressNumber,
      state: cliente.state,
      province: cliente.province,
      complement: cliente.complement == "" ? null : cliente.complement
    }

    const conexao = await propApi(`asaas/customers/${cliente.id || ''}`, {
      method: "POST",
      data: JSON.stringify(obj)
    });

    if (conexao.status === 200) {
      asaasService.loadClient(cliente.email, { silent: true });
      enqueueSnackbar('Cadastro salvo com sucesso!', { variant: 'success' });
    } else {
      console.log(conexao);
      enqueueSnackbar('Ops! Não foi possível salvar seu cadastro', { variant: 'error' });
    }

    return conexao;
  },

  generateCharge: async ({ proposta, cliente, cobranca }) => {
    const vencimento = new Date(cobranca.vencimento);
    const billingOpt = {
      customer: cliente.id,
      billingType: "BOLETO",
      interest: {
        value: 10.00,
        type: "PERCENTAGE"
      },
      dueDate: cobranca.vencimento, //2023-06-28
      description: `${proposta.nomeProjeto}: ${proposta.marca ? proposta.marca : proposta.cliente}`, //Identidade visual: Seletta || Identidade visual: Liliam
    }

    if (cobranca.parcelas > 1) {
      billingOpt.installmentCount = Number(cobranca.parcelas); //parcelas
      billingOpt.totalValue = proposta.valorTotal; //valor total se parcelado
    } else {
      billingOpt.value = proposta.valorVista //valor total se a vista
    }

    const retorno = await asaasService.saveBilling(billingOpt);

    //Se for pra emitir Nota Fiscal
    if (proposta.temNota) {
      let svcName;
      switch (proposta.categoria) {
        case "IV":
        case "NIV":
        case "NAM":
          svcName = "Criação de identidade visual"
          break;
        case "EMB":
          svcName = "Design: embalagem"
          break;
        case "MOVIE":
          svcName = "Captação e/ou edição audiovisual"
          break;
        default:
          svcName = "Design de materiais gráficos"
          break;
      }

      let nfOpt = {
        customer: cliente.id,
        serviceDescription: billingOpt.description, //Nota fiscal do Parcelamento de R$ 8.452,98 em 6x. \nDescrição dos Serviços: Criação de identidade visual.
        observations: "",
        value: billingOpt.totalValue || billingOpt.value,
        deductions: null,
        municipalServiceId: null,
        municipalServiceCode: "2301",
        municipalServiceName: svcName,
        taxes: {
          "retainIss": false,
          "iss": 2.17000,
          "cofins": null,
          "csll": null,
          "inss": null,
          "ir": null,
          "pis": null
        }
      }

      if (cobranca.parcelas > 1) {
        nfOpt.installment = retorno.cobranca.installment //vincula a cobrança parcelada
      } else {
        nfOpt.payment = retorno.cobranca.id //vincula a cobrança à vista
      }

      let hoje = new Date()
      let cincoDiasAntes = vencimento;
      cincoDiasAntes.setDate(vencimento.getDate() - 5);

      if (cincoDiasAntes.getMonth() < hoje.getMonth() || (cincoDiasAntes.getMonth() == hoje.getMonth() && cincoDiasAntes.getDate() <= hoje.getDate())) {
        nfOpt.effectiveDate = hoje.getFullYear() + "-" + (hoje.getMonth() + 1).toString().padStart(2, '0') + "-" + hoje.getDate().toString().padStart(2, '0') //2023-06-28
      } else {
        nfOpt.effectiveDate = cincoDiasAntes.getFullYear() + "-" + (cincoDiasAntes.getMonth() + 1).toString().padStart(2, '0') + "-" + cincoDiasAntes.getDate().toString().padStart(2, '0') //2023-06-28
      }

      const response = await asaasService.saveInvoice(nfOpt)
      retorno.nota = response;
    }

    return retorno;
  },

  saveBilling: async (billingOpt) => {
    const conexao = await propApi("asaas/payments", {
      method: "POST",
      data: JSON.stringify(billingOpt),
    })
    if (conexao.response?.data?.errors) {
      throw new Error("Erro 01: " + conexao.errors[0].description)
    }
    return {
      cobranca: conexao.data
    }
  },

  deleteBilling: async (cobranca) => {
    let url;

    if (cobranca.installment) {
      url = `asaas/installments/${cobranca.installment}`;
    } else {
      url = `asaas/payments/${cobranca.id}`;
    }

    const conexao = await propApi(url, {
      method: "DELETE",
    })
    return conexao.data;
  },

  saveInvoice: async (nfOpt) => {
    const conexao = await propApi('asaas/invoices', {
      method: "POST",
      data: JSON.stringify(nfOpt),
    })
    if (conexao.response?.data?.errors) {
      throw new Error("Erro 02: " + conexao.errors[0].description)
    }
    return conexao.data;
  },
}

export default asaasService;