import * as jwt from 'jsonwebtoken';
import { IToken } from '../interfaces/ILogin';

const SECRET = process.env.JWT_SECRET || 'my_secret';

const jwtGen = (data: IToken) => jwt.sign({ ...data }, SECRET, { expiresIn: '1d' });

export default jwtGen;
