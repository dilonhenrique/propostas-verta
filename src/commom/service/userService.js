import { propApi, propApiAuth } from '../infra/propApi';
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

const userService = {
  getUserList: async (access_token = tokenService.getAccess()) => {
    const listaUsuarios = await propApiAuth('usuarios', {
      access_token
    });
    return listaUsuarios;
  },

  getSingleUser: async (id, access_token = tokenService.getAccess()) => {
    const response = await propApiAuth(`usuarios/${id}`, {
      access_token
    });
    return response[0];
  },

  saveUser: async (usuario) => {
    const access_token = tokenService.getAccess();

    const id = usuario.id || '';
    delete usuario.id;

    try {
      const response = await propApiAuth(`usuarios/${id}`, {
        access_token,
        method: 'POST',
        data: JSON.stringify(usuario),
      });

      if (response.affectedRows) {
        enqueueSnackbar('Usuário salvo com sucesso!', { variant: 'success' })
        return { ...response, ok: true };
      } else if (response.data.emailExists) {
        enqueueSnackbar('Este email já está cadastrado', { variant: 'error' });
        return { ...response, ok: false };
      } else {
        throw Error(response)
      }
    } catch (err) {
      console.log(err)
      enqueueSnackbar('Ops! Erro ao salvar', { variant: 'error' });
      return { ...err, ok: false };
    }
  },

  deleteUser: async (id) => {
    try {
      const access_token = tokenService.getAccess();
      const response = await propApiAuth(`usuarios/${id}`, {
        access_token,
        method: 'DELETE',
      });

      if (response.affectedRows) {
        enqueueSnackbar('Usuário excluído com sucesso!', {
          variant: 'success',
        });
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
}

export default userService;
