import jwt from 'jsonwebtoken';

const ACCESSTOKEN_SECRET = process.env.ACCESSTOKEN_SECRET;
const ACCESSTOKEN_EXPIRATION = '60s';
const REFRESHTOKEN_SECRET = process.env.REFRESHTOKEN_SECRET;
const REFRESHTOKEN_EXPIRATION = '7d';

export const authService = {
  generateAccessToken: async (user, role = 'user') => {
    return await jwt.sign(
      { role: role },
      ACCESSTOKEN_SECRET,
      { subject: String(user), expiresIn: ACCESSTOKEN_EXPIRATION }
    );
  },

  validateAccessToken: async (accessToken) => {
    return await jwt.verify(accessToken, ACCESSTOKEN_SECRET);
  },

  isAuthenticated: async (req) => {
    const token = getTokenFromHeaders(req);
    
    try {
      await authService.validateAccessToken(token);
      return true;
    } catch (err) {
      return false;
    }
  },

  generateRefreshToken: async (user) => {
    return await jwt.sign(
      {},
      REFRESHTOKEN_SECRET,
      { subject: String(user), expiresIn: REFRESHTOKEN_EXPIRATION }
    );
  },

  validateRefreshToken: async (accessToken) => {
    return await jwt.verify(accessToken, REFRESHTOKEN_SECRET);
  },

  decodeToken: async (accessToken) => {
    return await jwt.decode(accessToken);
  },
}

export function getTokenFromHeaders(req) {
  const authHeader = req.headers['x-authorization'] || req.headers['authorization'] || '';
  const token = authHeader?.split(' ')[authHeader?.split(' ').length - 1];
  return token;
}

export default async function handler(req, res) {
  res.status(404).end();
}