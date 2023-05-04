import propApi from '../infra/propApi';
import createEscopo from "../propFunctions/createEscopo";
import { addIdToObject } from "../propFunctions/addID";

const propostaService = {
  getPropostaList: async () => {
    const listaPropostas = await propApi('propostas');
    return listaPropostas.data;
  },
  
  getSingleProposta: async (id) => {
    const response = await propApi(`propostas/${id[0]}`);
    const proposta = createEscopo(addIdToObject(response.data[0]));
    return proposta;
  },

  getVersions: async (numeroProposta) => {
    const listaPropostas = await propostaService.getPropostaList();
    const versoes = listaPropostas.reduce((acc, proposta) => {
      if (proposta.numeroProposta === numeroProposta) {
        acc.push({
          versao: Number(proposta.versaoProposta),
          id: proposta.id,
        })
      }
      return acc;
    }, []);
    return versoes;
  },

  getDefaultParams: async () => {
    const { data } = propApi('defaultParams');
    return data;
  },

  getNextProposta: async () => {
    const listaPropostas = await propostaService.getPropostaList();
    const amostragem = 10 //x últimas propostas (performance)

    let maior = listaPropostas[0];
    for (let i = listaPropostas.length - amostragem; i < listaPropostas.length; i++) {
      const proposta = listaPropostas[i];
      if (proposta.numeroProposta > maior.numeroProposta) {
        maior = proposta
      }
    }
    return maior.numeroProposta + 1;
  },
}

export default propostaService;
