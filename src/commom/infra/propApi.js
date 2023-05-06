import axios from 'axios';
import { tokenService } from '../service/tokenService';

// const API_URL = 'http://localhost:3000/api/';
const API_URL = 'https://propostas.vercel.app/api/';

export const propApi = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  }
})

export async function propApiAuth(fetchUrl, fetchOptions) {
  const { ctx } = fetchOptions
  const accessTokenAtual = fetchOptions?.access_token || tokenService.getAccess(ctx);

  const options = {
    ...fetchOptions,
    headers: {
      ...fetchOptions.headers,
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessTokenAtual}`,
    },
    body: fetchOptions.body ? JSON.stringify(fetchOptions.body) : null
  }

  try {
    if (!accessTokenAtual) throw { response: { status: 401, message: 'No access token code provided' } };

    const response = await propApi(fetchUrl, options);
    if (response.status === 401) throw response;
    if (response.status === 200) return response.data;
    return response;

  } catch ({ response }) {
    if (fetchOptions.retry === false) return response;

    try {
      const refreshTokenAtual = fetchOptions?.ctx?.req?.cookies.rtPropV || null;
      const method = ctx ? 'POST' : 'GET';

      if (!refreshTokenAtual) throw { response: { status: 401, message: 'No refresh token code provided' } };

      const refreshResponse = await propApi('refresh', {
        method,
        data: {
          refresh_token: refreshTokenAtual ? refreshTokenAtual : undefined,
        }
      })

      const newAccessToken = refreshResponse.data.data.access_token;
      tokenService.saveAccess(newAccessToken, ctx);
      
      //retry com novo access token
      const retryResponse = await propApiAuth(fetchUrl, {
        ...options,
        retry: false,
        access_token: newAccessToken,
        ctx,
      })
      return {
        ...retryResponse,
        isRefreshed: true,
        access_token: newAccessToken,
      }
    } catch (err) {
      console.log('Final error:', err)
      throw new Error(err.message)
    }
  }
}