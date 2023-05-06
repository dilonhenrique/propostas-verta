import {propApi} from '../infra/propApi';
import createEscopo from "../propFunctions/createEscopo";
import { addIdToObject } from "../propFunctions/addID";
import { tokenService } from './tokenService';

const propostaService = {
  getPropostaList: async (token) => {
    const listaPropostas = await propApi('propostas',{
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      }
    });
    return listaPropostas.data;
  },

  getSingleProposta: async (id, token) => {
    const response = await propApi(`propostas/${id[0]}`,{
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      }
    });
    const proposta = createEscopo(addIdToObject(response.data[0]));
    return proposta;
  },

  getVersions: async (numeroProposta, token) => {
    const listaPropostas = await propostaService.getPropostaList(token);
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

  getDefaultParams: async (token) => {
    const { data } = propApi('defaultParams',{
      headers: {
        'Authorization': token ? `Bearer ${token}` : undefined,
      }
    });
    return data;
  },

  getNextProposta: async (token) => {
    const listaPropostas = await propostaService.getPropostaList(token);
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
}

export default propostaService;
