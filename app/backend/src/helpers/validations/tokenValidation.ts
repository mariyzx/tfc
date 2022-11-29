import { verify } from '../utils/jwt';

const validateToken = (token: string) => {
  try {
    if (!token) return { status: 401, message: 'Token not found!' };

    verify(token);
  } catch (err) {
    return { status: 401, message: 'Token must be a valid token' };
  }
};

export default validateToken;
