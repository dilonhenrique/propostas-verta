import { Alert, Checkbox, FormControlLabel } from '@mui/material';
import React, { forwardRef, useState } from 'react'
import { TbCashBanknote, TbMailForward } from 'react-icons/tb';
import extenso from '@/commom/utils/extenso';
import styles from '../AssinaturaProp.module.scss';
import { useSelector } from 'react-redux';
import AceiteCheckbox from '@/components/elements/Aceite';

function proximoMes(date, i) {
  let d = new Date(date);
  let o = new Date(date);
  d.setMonth(d.getMonth() + i);

  // If have rolled over an extra month, set to last
  // day of previous month
  if (d.getDate() != o.getDate()) {
    d.setDate(0);
  }
  return d;
}

function Contrato({ register }, ref) {

  const { propostaAtual, cliente, cobranca } = useSelector(state => ({
    cliente: state.assinatura.cliente,
    cobranca: state.assinatura.cobranca,
    propostaAtual: state.assinatura.proposta,
  }));

  function montarContrato() {
    let hoje = new Date()
    const contrato = {
      email: cliente.email,
      name: cliente.name,
      cpfCnpj: cliente.cpfCnpj,
      address: cliente.address,
      addressNumber: cliente.addressNumber,
      complement: `, ${cliente.complement}`,
      province: cliente.province,
      cityName: cliente.cityName,
      state: cliente.state,
    }

    if (contrato.cpfCnpj?.length > 11) {
      contrato.pessoa = "empresa inscrita no CNPJ"
      contrato.sede = "com sede na"
    } else {
      contrato.pessoa = "pessoa física inscrita no CPF"
      contrato.sede = "residente e domiciliado na"
    }

    contrato.numero = "CONTRATO " + propostaAtual.numeroProposta + "/" + hoje.getFullYear()

    switch (propostaAtual.categoria) {
      case "IV":
        contrato.categoriaNome = "Identidade visual"
        contrato.servicos = "criação de identidade visual e materiais gráficos"
        break;
      case "NAM":
        contrato.categoriaNome = "Naming"
        contrato.servicos = "criação de nome estratégico"
        break;
      case "NIV":
        contrato.categoriaNome = "Naming + id. visual"
        contrato.servicos = "criação de nome, identidade visual e materiais gráficos"
        break;
      case "EMB":
        contrato.categoriaNome = "Embalagem"
        contrato.servicos = "criação gráfica para embalagem"
        break;
      case "DESIGN":
        contrato.categoriaNome = "Design"
        contrato.servicos = "design de materiais gráficos"
        break;
      case "MOVIE":
        contrato.categoriaNome = "Audiovisual"
        contrato.servicos = "criação audiovisual"
        break;
      default:
        contrato.categoriaNome = "Identidade visual"
        contrato.servicos = "criação de identidade visual e materiais gráficos"
        break;
    }

    contrato.titulo = "Contrato de " + contrato.categoriaNome

    if (cobranca.parcelas > 1) {
      contrato.valorTotal = propostaAtual.valorTotal
    } else {
      contrato.valorTotal = propostaAtual.valorVista
    }

    contrato.escopo = "";
    propostaAtual.escopo.forEach(item => {
      if (item.tipo === 'fase') {
        contrato.escopo = contrato.escopo.slice(0, -2);
        contrato.escopo += ".</li>";
        contrato.escopo += `<li><b>${item.nome} (${item.tempo}h) - </b>`;
      } else {
        contrato.escopo += `${item.nome}, `
      }
    })
    contrato.escopo = contrato.escopo.slice(0, -2);
    contrato.escopo += ".</li>";
    contrato.escopo = contrato.escopo.slice(6, contrato.escopo.length);

    let valorParcela = (contrato.valorTotal / cobranca.parcelas).toLocaleString('pt-BR', { minimumFractionDigits: 2, style: 'currency', currency: 'BRL' });
    contrato.parcelas = cobranca.parcelas > 1 ? `paga em ${cobranca.parcelas}x de ${valorParcela} através de boleto bancário com vencimento da primeira parcela` : "paga à vista através de boleto bancário com vencimento"

    contrato.valorTotal = contrato.valorTotal.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    contrato.valorExtenso = extenso(contrato.valorTotal);


    let vencimento = new Date(cobranca.vencimento);
    contrato.vencimento = vencimento.getDate().toString().padStart(2, '0') + "/" + (vencimento.getMonth() + 1).toString().padStart(2, '0') + "/" + vencimento.getFullYear();

    const month = ["janeiro", "fevereiro", "março", "abril", "maio", "junho", "julho", "agosto", "setembro", "outubro", "novembro", "dezembro"];
    contrato.dataHoje = `Gravataí, ${hoje.getDate()} de ${month[hoje.getMonth()]} de ${hoje.getFullYear()}`;

    return (
      <>
        <p><em><span style={{ fontSize: '11px' }}>{contrato.numero}</span></em></p>
        <p><b>CONTRATANTE - </b>{contrato.name}, {contrato.pessoa} nº {contrato.cpfCnpj}, {contrato.sede} {contrato.address}, nº {contrato.addressNumber}{contrato.complement}, no bairro {contrato.province} na cidade de {contrato.cityName}{contrato.state}.</p>
        <p><b>CONTRATADO - </b>Estúdio Vertá Ltda., empresa inscrita no CNPJ nº 28.781.103/0001-55, com sede na Av. José Loureiro da Silva, nº 2025, sala 906, no Centro da cidade de Gravataí/RS.</p>
        <p>As partes acima identificadas têm entre si justo e acordado o presente Contrato de criação de {contrato.categoriaNome}, que se regerá pelas cláusulas seguintes e pelas condições de preço e pagamento descritas no presente.</p>
        <p><b>DO OBJETO DO CONTRATO</b></p>
        <p><b>Cláusula 1 - </b>O presente contrato tem como objeto a prestação pelo CONTRATADO ao CONTRATANTE dos serviços de {contrato.servicos} para marca do CONTRATANTE. Para chegar ao resultado esperado, o CONTRATADO seguirá uma metodologia própria, abordando as seguintes etapas:</p>
        <ol style={{ listStyle: 'lower-latin', paddingLeft: '1rem' }} dangerouslySetInnerHTML={{ __html: contrato.escopo }}></ol>
        <p><b>Cláusula 2 - </b>O estilo de criação, tipos de aplicações e outras definições criativas menores a serem desenvolvidas serão estabelecidas na fase estratégica do projeto, pois será preciso estudar o contexto em que a marca do CONTRATANTE está inserida para criar soluções que supram sua necessidade.</p>
        <p><b>Cláusula 3 - </b>Caso as partes não concordem com o resultado obtido ao final do projeto, o CONTRATANTE terá direito a 1 (uma) nova rodada de alteração do projeto de acordo com as especificações solicitadas ao CONTRATADO.</p>
        <p><b>Parágrafo único - </b>Se a alteração referida implicar em reanálise da fase previamente concluída e aprovada pelo CONTRATANTE, estará sujeito a novo cronograma e/ou redefinição do valor acordado, conforme definido de comum acordo pelas partes e formalizado em Termo Aditivo.</p>
        <p><b>OBRIGAÇÕES DO CONTRATANTE</b></p>
        <p><b>Cláusula 4 - </b>O CONTRATANTE é obrigado a fornecer e/ou facilitar o acesso às informações sobre a história da empresa, funcionários, crescimento e evolução de mercado, faturamento aproximado (se necessário), concorrentes, produtos, serviços, fornecedores, agenciadores, corretores, representantes, etc.</p>
        <p><b>Cláusula 5 - </b>O CONTRATANTE se compromete a comparecer às reuniões de revisão do projeto para aprovar, solicitar alterações ou rejeitar o resultado apresentado na respectiva fase do projeto, desde que não previamente aprovado, em data, local e horário a definir juntamente com a CONTRATADA.</p>
        <p><b>Cláusula 6 - </b>O CONTRATANTE deverá efetuar o pagamento de acordo com as condições estabelecidas na cláusula 10.</p>
        <p><b>OBRIGAÇÕES DA CONTRATADO</b></p>
        <p><b>Cláusula 7 - </b>O CONTRATADO se compromete a disponibilizar todos os arquivos digitais produzidos em arquivos vetoriais (Adobe Illustrator e Adobe PDF) e bitmap (jpeg e png) em alta resolução.</p>
        <p><b>Cláusula 8 - </b>O CONTRATADO se compromete a agendar e comparecer às reuniões de revisão do projeto para apresentar os resultados até o momento.</p>
        <p><b>Cláusula 9 - </b>Caso seja da vontade do CONTRATANTE, o CONTRATADO será obrigada a fazer pelo menos 1 (uma) rodada de alteração do projeto de acordo com as especificações solicitadas, nos termos e limites da Cláusula 3.</p>
        <p><b>DO PREÇO E DAS CONDIÇÕES DE PAGAMENTO</b></p>
        <p><b>Cláusula 10 - </b>O serviço contratado no presente instrumento será remunerado pela quantia de {contrato.valorTotal} ({contrato.valorExtenso}), {contrato.parcelas} para o dia {contrato.vencimento}.<b> </b></p>
        <p><b>Parágrafo 1 - </b>Caso não ocorra a quitação do pagamento de alguma parcela dentro da data de vencimento determinada, será automaticamente cancelado o presente contrato e o CONTRATANTE não será ressarcido de quaisquer valores eventualmente adimplidos, exceto por motivo de força maior comprovadamente demonstrado.</p>
        <p><b>DO INADIMPLEMENTO</b></p>
        <p><b>Cláusula 11 - </b>Em caso de inadimplemento por parte da CONTRATANTE quanto ao pagamento do serviço prestado de acordo com a Cláusula 10, fica estabelecido o cancelamento do contrato sujeito a perda do valor já pago.</p>
        <p><b>Parágrafo único - </b>Em caso de cobrança judicial por trabalho não remunerado, deverá ser acrescido ao valor do contrato as custas processuais e 20% de honorários advocatícios.</p>
        <p><b>DAS CONDIÇÕES GERAIS</b></p>
        <p><b>Cláusula 12 - </b>Caso haja a desistência do projeto, por qualquer motivo e em qualquer tempo, por parte do CONTRATANTE, o CONTRATADO deverá ser notificado. O CONTRATADO estará sujeito a perda do valor referente às horas trabalhadas no projeto pelo CONTRATADA até o recebimento da referida notificação.</p>
        <p><b>Parágrafo único - </b>Fica fixada ainda, multa contratual pela desistência de qualquer uma das partes em 20% (vinte porcento) do valor total do presente contrato, adescrito na Cláusula 10.</p>
        <p><b>Cláusula 13 - </b>O CONTRATADO cede o direito de uso ao CONTRATANTE de todas as criações resultantes do presente contrato, após o pagamento de acordo com a cláusula 10. Os Direitos autorais, porém, pertencerão ao CONTRATADO (conforme lei nº 9.610, de 19 de fevereiro de 1998), tendo este o direito de utilizar imagens de materiais gráficos, digitais, fachadas, ou que tenham sidos por ele projetados em seu website, blog e mídias sociais como forma de divulgação gratuitamente e por tempo indeterminado.</p>
        <p><b>Cláusula 14 - </b>Qualquer alteração, modificação, complementação ou ajuste do presente instrumento, somente será reconhecido e produzirá efeitos legais, se incorporado ao presente contrato mediante Termo Aditivo, devidamente assinado pelas partes contratantes.</p>
        <p><b>Cláusula 15 - </b>Os valores de produção, impressão, instalação, sessão fotográfica, ou registro de marca não estão inclusos no presente instrumento, sendo estes custos adicionais de responsabilidade exclusiva do CONTRATANTE.</p>
        <p><b>Cláusula 16 - </b>O CONTRATADO não dará início ao projeto antes da confirmação do pagamento da primeira parcela do pagamento descrito na cláusula 10.</p>
        <p><b>DO FORO</b></p>
        <p><b>Cláusula 17 - </b>Para dirimir quaisquer controvérsias do presente contrato, as partes elegem o foro da Comarca de Gravataí.</p>
        <p>E por estarem justas e acordadas, na melhor forma de direito, as partes assinam o presente contrato, em duas vias originais e de igual teor e forma.</p>
        <p>{contrato.dataHoje}</p>
      </>
    )
  }

  function montarParcelas() {
    let arrayParcelas = [];
    if (cobranca.parcelas && cobranca.vencimento) {
      if (cobranca.parcelas > 1) {
        const valor = (propostaAtual.valorTotal / cobranca.parcelas).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
        for (let i = 0; i < cobranca.parcelas; i++) {
          const vencimento = proximoMes(cobranca.vencimento, i)
          arrayParcelas.push({
            vencimento: vencimento.toLocaleDateString("en-GB", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
            }),
            valor,
          })
        }
      } else {
        arrayParcelas.push({
          vencimento: new Date(cobranca.vencimento).toLocaleDateString("en-GB", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          }),
          valor: propostaAtual.valorVista.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }),
        });
      }
    }

    return (<>
      <ul style={{ listStyle: 'none' }}>
        <li><b>{cobranca.parcelas > 1 ? `Pgto. em ${cobranca.parcelas}x no boleto` : 'Pgto. à vista no boleto'}</b></li>
        {arrayParcelas.map(parcela => (<li key={parcela.vencimento}>{parcela.vencimento} - {parcela.valor}</li>))}
      </ul>
    </>)
  }

  return (
    <div ref={ref} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <h2>Assinatura</h2>
      <Alert icon={<TbMailForward size={30} />}>
        As cobranças serão enviadas para o email {cliente.email}. {propostaAtual.temNota && 'A nota fiscal será enviada 5 dias antes do vencimento do primeiro boleto.'}
      </Alert>
      <Alert icon={<TbCashBanknote size={30} />}>
        {montarParcelas()}
      </Alert>
      <div className={styles.contrato}>
        {montarContrato()}
      </div>

      <AceiteCheckbox {...register('aceito')} required label="Li e aceito o contrato" />
    </div>
  )
}

export default forwardRef(Contrato);
