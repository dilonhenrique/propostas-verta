import { propApi, propApiAuth } from "../infra/propApi";
import { tokenService } from "./tokenService";
import nookies from 'nookies';

const authService = {
  login: async (user, password) => {
    try {
      const { data } = await propApi.post('login', { user, password });
      tokenService.saveAccess(data.data.access_token);
      return data;
    } catch (err) {
      console.error('erro de login', err);
      return err;
    }
  },

  getSession: async (ctx = null) => {
    const access_token = tokenService.getAccess(ctx);

    return await propApiAuth('session', {
      access_token,
      ctx
    })
  },

  isLogged: async (ctx = null) => {
    if(tokenService.getAccess(ctx) === '') return false;
    return await authService.getSession()
      .then(res => {
        return true;
      })
      .catch(err => {
        return false;
      })
  },
}

export default authService;