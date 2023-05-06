import nookies from 'nookies';
import {propApi} from '../infra/propApi';

const ACCESS_TOKEN_NAME = 'atPropV';

const ONE_SECOND = 1;
const ONE_MINUTE = ONE_SECOND * 60;
const ONE_HOUR = ONE_MINUTE * 60;
const ONE_DAY = ONE_HOUR * 24;
const ONE_YEAR = ONE_DAY * 365;

export const tokenService = {
  saveAccess: (accessToken, ctx = null) => {
    nookies.set(ctx, ACCESS_TOKEN_NAME, accessToken, {
      maxAge: ONE_DAY * 30,
      path: '/'
    })
  },

  getAccess: (ctx = null) => {
    const cookies = nookies.get(ctx);
    return cookies[ACCESS_TOKEN_NAME] || '';
  },

  delete: async (ctx = null) => {
    await propApi.delete('refresh');
    nookies.destroy(ctx, ACCESS_TOKEN_NAME);
  }
}