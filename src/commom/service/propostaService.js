import { propApiAuth } from '../infra/propApi';
import createEscopo from "../propFunctions/createEscopo";
import { addIdToObject } from "../propFunctions/addID";
import { tokenService } from './tokenService';
import translateJsToDb from '../utils/translateJsToDb';
import Router from 'next/router';

const propostaService = {
  getPropostaList: async (access_token) => {
    const listaPropostas = await propApiAuth('propostas', {
      access_token
    });
    return listaPropostas;
  },

  getSingleProposta: async (id, access_token) => {
    const response = await propApiAuth(`propostas/${id[0]}`, {
      access_token
    });
    const proposta = addIdToObject(createEscopo(response[0]));
    return proposta;
  },

  getVersions: async (numeroProposta, access_token) => {
    const listaPropostas = await propostaService.getPropostaList(access_token);
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

  getDefaultParams: async (access_token) => {
    const params = propApiAuth('defaultParams', {access_token});
    return params;
  },

  getNextProposta: async (access_token) => {
    const listaPropostas = await propostaService.getPropostaList(access_token);
    const amostragem = 10 //pega as x últimas propostas (performance)

    let maior = listaPropostas[0];
    for (let i = listaPropostas.length - amostragem; i < listaPropostas.length; i++) {
      const proposta = listaPropostas[i];
      if (proposta.numeroProposta > maior.numeroProposta) {
        maior = proposta
      }
    }
    return maior.numeroProposta + 1;
  },

  saveProposta: async (proposta) => {
    const access_token = tokenService.getAccess();
    const propostaTratada = translateJsToDb(proposta);
    delete propostaTratada.id;
    
    const id = proposta.id || '';

    const response = await propApiAuth(`propostas/${id}`, {
      access_token,
      method: 'POST',
      data: JSON.stringify(propostaTratada),
    });
    
    if(response.insertId){
      Router.replace({
        pathname: `/editar/${response.insertId}`,
      }, 
      undefined,
      { shallow: true }
      )
    }
    
    return response;
  },
}

export default propostaService;
