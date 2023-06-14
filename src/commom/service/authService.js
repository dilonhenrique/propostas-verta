import store from "@/store";
import { propApi, propApiAuth } from "../infra/propApi";
import { tokenService } from "./tokenService";
import nookies from 'nookies';
import { setUser, updateUser } from "@/store/reducers/globalStatus";

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

    const response = await propApiAuth('session', {
      access_token,
      ctx
    })
    // store.dispatch(setUser(response.data)); //DISPATCH DOESNT WORK IN SERVER SIDE :(
    
    return response;
  },

  isLogged: async (ctx = null) => {
    if(tokenService.getAccess(ctx) === '') return false;
    return await authService.getSession(ctx)
      .then(res => {
        return true;
      })
      .catch(err => {
        return false;
      })
  },
}

export default authService;