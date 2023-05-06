import { authService } from "../authService";
import {executeQuery} from "../db";
import nookies from 'nookies';

const REFRESH_TOKEN_NAME = 'rtPropV';

const controllers = {
  regenarateServerSide: async (req, res) => {
    const ctx = { req, res };
    const token = req.body?.refresh_token;
    return controllers.regenerateTokens(ctx, token);
  },

  regenarateClientSide: async (req, res) => {
    const ctx = { req, res };
    const cookies = nookies.get(ctx);
    const token = cookies[REFRESH_TOKEN_NAME];
    return controllers.regenerateTokens(ctx, token);
  },

  regenerateTokens: async ({ req, res }, token) => {
    try {
      await authService.validateRefreshToken(token);
      const decodedToken = await authService.decodeToken(token);

      const query = `SELECT * FROM usuarios WHERE email = '${decodedToken.sub}' LIMIT 1`;
      const [user] = await executeQuery({ query });

      if (user.Email) {
        const access_token = await authService.generateAccessToken(user.Email, user.Role);
        const refresh_token = await authService.generateRefreshToken(user.Email);

        nookies.set({ req, res }, REFRESH_TOKEN_NAME, refresh_token, {
          httpOnly: true,
          sameSite: 'lax',
          path: '/'
        })

        res.status(200).json({
          isLogged: true,
          data: {
            access_token,
            refresh_token,
          },
        })
      } else {
        res.status(401).json({
          message: 'Your refresh token is not valid.'
        });
      }
    } catch (err) {
      res.status(401).json({ message: 'Not Authorized' });
    }
  },

  destroyTokens: async (req, res) => {
    const ctx = { req, res };
    nookies.destroy(ctx, REFRESH_TOKEN_NAME, {
      httpOnly: true,
      sameSite: 'lax',
      path: '/'
    })
    res.status(200).json({
      message: 'Token excluído com sucesso!'
    })
  },
}

const controllerBy = {
  GET: controllers.regenarateClientSide,
  POST: controllers.regenarateServerSide,
  DELETE: controllers.destroyTokens,
}

export default async function handler(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

  res.status(404).json({ message: 'Not found' })
}