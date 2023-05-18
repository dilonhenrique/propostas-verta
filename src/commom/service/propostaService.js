import { propApiAuth } from '../infra/propApi';
import { tokenService } from './tokenService';
import translateJsToDb from '../utils/translateJsToDb';
import Router from 'next/router';
import store from '@/store';
import createFases from '../propFunctions/createFases';
import { updateListaProposta } from '@/store/reducers/listaPropostas';
import { enqueueSnackbar } from 'notistack';
import propostaDispatcher from '../dispatchers/propostaDispatcher';
import { Button } from '@mui/material';
import { setSaved } from '@/store/reducers/propostaAtual';

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
    return response[0];
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

  getDefaultParams: async (access_token = tokenService.getAccess()) => {
    const params = propApiAuth('defaultParams', { access_token });
    return params;
  },

  getNextProposta: async (access_token = tokenService.getAccess()) => {
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
    const { propostaAtual } = store.getState();
    let versoesAtual = propostaAtual.versoes;

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
      propostaDispatcher.setPropostaSaved();
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
        store.dispatch(setSaved(true));
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
            <Button color="inherit" size="small" variant='outlined' onClick={() => propostaService.undeleteProposta(id)}>
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
      Router.replace(Router.asPath);
    }
    return response;
  },

  changeStatus: async (proposta, newStatus) => {
    const access_token = tokenService.getAccess();
    if(proposta.status === newStatus) return;

    const response = await propApiAuth(`propostas/${proposta.id}`, {
      access_token,
      method: 'POST',
      data: JSON.stringify({ status: newStatus }),
    });

    if (response.affectedRows) {
      //muda o estado das versoes alternativas
      const { listaPropostas } = store.getState();
      const [{ versoes }] = listaPropostas.data.filter(prop => prop.numeroProposta === proposta.numeroProposta);
      const versoesAlt = versoes.filter(prop => prop.versaoProposta !== proposta.versaoProposta);
      //se mudar PARA aprovada
      if(newStatus === 'aprovada'){
        versoesAlt.forEach(async versao => {
          if(versao.status !== 'aprovada*')
            await propApiAuth(`propostas/${versao.id}`, {
              access_token,
              method: 'POST',
              data: JSON.stringify({ status: 'aprovada*' }),
            });
        })
      }
      //se mudar DE aprovada
      if(proposta.status === 'aprovada'){
        versoesAlt.forEach(async versao => {
          if(versao.status === 'aprovada*')
            await propApiAuth(`propostas/${versao.id}`, {
              access_token,
              method: 'POST',
              data: JSON.stringify({ status: 'aberta' }),
            });
        })
      }

      //atualiza a lista de propostas
      store.dispatch(updateListaProposta());
    }

    return response;
  },
}

export default propostaService;
