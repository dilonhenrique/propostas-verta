import { authService, getTokenFromHeaders } from "../authService";
import { executeQuery } from "../db";

const controllers = {
  getSession: async (req, res) => {
    const token = getTokenFromHeaders(req);

    if (!token) return res.status(401).json({ error: { status: 401, message: 'You don\'t have credentials' } });

    try {
      await authService.validateAccessToken(token);
      const decodedToken = await authService.decodeToken(token);
      const query = `SELECT * FROM usuarios WHERE email = '${decodedToken.sub}' LIMIT 1`;
      const [user] = await executeQuery({ query });

      res.status(200).json({
        data: {
          nome: user.Nome,
          email: decodedToken.sub,
          role: decodedToken.role,
        }
      });
    } catch (err) {
      res.status(401).json({
        message: 'Your access token is not valid.'
      });
    }
  }
}

const controllerBy = {
  GET: controllers.getSession,
  OPTIONS: (_, res) => res.send('OK'),
}

export default async function handler(req, res) {
  if (controllerBy[req.method]) return controllerBy[req.method](req, res);

  res.status(404).json({ message: 'Not found' })
}