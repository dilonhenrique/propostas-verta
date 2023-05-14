import { propApiAuth } from '../infra/propApi';
import createEscopo from "../propFunctions/createEscopo";
import { addIdToObject } from "../propFunctions/addID";
import { tokenService } from './tokenService';
import translateJsToDb from '../utils/translateJsToDb';
import Router from 'next/router';
import store from '@/store';
import createFases from '../propFunctions/createFases';
import { updateListaProposta } from '@/store/reducers/listaPropostas';
import { enqueueSnackbar } from 'notistack';
import propostaDispatcher from '../dispatchers/propostaDispatcher';
import { Button } from '@mui/material';

const propostaService = {
  getPropostaList: async (access_token = tokenService.getAccess()) => {
    const listaPropostas = await propApiAuth('propostas', {
      access_token
    });
    return listaPropostas;
  },

  getSingleProposta: async (id, access_token = tokenService.getAccess()) => {
    const response = await propApiAuth(`propostas/${id}`, {
      access_token
    });
    const proposta = addIdToObject(createEscopo(response[0]));
    return proposta;
  },

  getVersions: async (numeroProposta, access_token = tokenService.getAccess()) => {
    const listaPropostas = await propostaService.getPropostaList(access_token);
    const versoes = listaPropostas.reduce((acc, proposta) => {
      if (proposta.numeroProposta === numeroProposta) {
        acc.push({
          versaoProposta: Number(proposta.versaoProposta),
          id: proposta.id,
        })
      }
      return acc;
    }, []);
    return versoes;
  },

  getDefaultParams: async (access_token) => {
    const params = propApiAuth('defaultParams', { access_token });
    return params;
  },

  getNextProposta: async (access_token) => {
    access_token = access_token || tokenService.getAccess();
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

  getNextVersion: async (numeroProposta) => {
    let { versoesAtual } = store.getState();
    if (numeroProposta !== undefined) {
      const access_token = tokenService.getAccess();
      const listaPropostas = await propostaService.getPropostaList(access_token);
      versoesAtual = listaPropostas.filter(prop => prop.numeroProposta === numeroProposta)
    }

    let maior = versoesAtual[0];
    for (let i = 0; i < versoesAtual.length; i++) {
      const proposta = versoesAtual[i];
      if (proposta.versaoProposta > maior.versaoProposta) {
        maior = proposta
      }
    }
    return maior.versaoProposta + 1;
  },

  saveProposta: async (proposta) => {
    const access_token = tokenService.getAccess();
    //criando fases temporatiamente
    const propostaTratada = translateJsToDb(createFases(proposta));
    delete propostaTratada.id;
    const id = proposta.id || '';

    try {
      const response = await propApiAuth(`propostas/${id}`, {
        access_token,
        method: 'POST',
        data: JSON.stringify(propostaTratada),
      });

      if (response.insertId) {
        Router.push({
          pathname: `/editar/${response.insertId}`,
        },
          undefined,
          { shallow: true }
        )

        //atualiza no store
        propostaDispatcher.updateVersions(await propostaService.getVersions(proposta.numeroProposta));
        propostaDispatcher.updateProposta({ ...proposta, id: response.insertId });

      }
      if (response.affectedRows) {
        enqueueSnackbar('Proposta salva com sucesso!', { variant: 'success' })
        return response;
      } else {
        throw Error(response)
      }
    } catch (err) {
      console.log(err)
      enqueueSnackbar('Ops! Erro ao salvar.', { variant: 'error' });
      return err;
    }
  },

  deleteProposta: async (id) => {
    try {
      const access_token = tokenService.getAccess();
      const response = await propApiAuth(`propostas/${id}`, {
        access_token,
        method: 'DELETE',
      });

      if (response.affectedRows) {
        enqueueSnackbar('Proposta excluída com sucesso!', {
          variant: 'success',
          action:
            <Button color="inherit" size="small" onClick={() => propostaService.undeleteProposta(id)}>
              Desfazer
            </Button>
        });
        store.dispatch(updateListaProposta());
        return response;
      } else {
        throw Error(response)
      }
    } catch (err) {
      console.log(err)
      enqueueSnackbar('Ops! Erro ao excluir.', { variant: 'error' });
      return err;
    }
  },

  undeleteProposta: async (id) => {
    const access_token = tokenService.getAccess();

    const response = await propApiAuth(`propostas/${id}`, {
      access_token,
      method: 'POST',
      data: JSON.stringify({ excluido: 0 }),
    });

    if (response.affectedRows) {
      Router.push(`/editar/${id}`);
    }
    return response;
  },

  changeStatus: async (id, newStatus) => {
    const access_token = tokenService.getAccess();

    const response = await propApiAuth(`propostas/${id}`, {
      access_token,
      method: 'POST',
      data: JSON.stringify({ status: newStatus }),
    });

    if (response.affectedRows) {
      store.dispatch(updateListaProposta());
    }

    return response;
  },
}

export default propostaService;
