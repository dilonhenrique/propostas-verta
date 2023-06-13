import { authService } from "../authService";
import { executeQuery } from "../db";
import bcrypt from 'bcrypt';
import nookies from 'nookies';

const REFRESH_TOKEN_NAME = 'rtPropV';

const controllers = {
  login: async (req, res) => {
    const { user, password } = req.body;

    try {
      if (!user || !password) {
        res.status(401).json({ message: 'Not Authorized' });
      } else {
        const query = `SELECT * FROM usuarios WHERE email = '${user}' LIMIT 1`;
        const loginTry = await executeQuery({ query });

        const passwordCorrect = await isSamePass(password, loginTry[0].Senha);
        if (!passwordCorrect) {
          res.status(401).json({ message: 'Not Authorized' });
        } else {
          const access_token = await authService.generateAccessToken(loginTry[0].Email, loginTry[0].Role);
          const refresh_token = await authService.generateRefreshToken(loginTry[0].Email);

          const ctx = { req, res };
          nookies.set(ctx, REFRESH_TOKEN_NAME, refresh_token, {
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
        }

      }
    } catch (err) {
      res.status(401).json({ message: 'Not Authorized' });
    }
  }
}

const controllerBy = {
  POST: controllers.login,
}

export default async function handler(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

  res.status(404).json({ message: 'Not found' })
}

export async function isSamePass(unHashed, hashed) {
  return bcrypt.compare(unHashed, hashed)
    .then(result => {
      return result;
    })
}

export async function hashPass(pass) {
  return bcrypt.hash(pass, 2)
    .then(result => {
      return result;
    })
}