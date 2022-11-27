import * as jwt from 'jsonwebtoken';
import { IToken } from '../../interfaces/ILogin';

const SECRET = process.env.JWT_SECRET || 'my_secret';

const jwtGen = (data: IToken) => jwt.sign({ ...data }, SECRET, { expiresIn: '1d' });

const verify = (token: string) => jwt.verify(token, SECRET);

export { jwtGen, verify };
