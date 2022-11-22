import { Pool } from 'mysql2/promise';

interface User {
  id: number,
  username: string,
  role: string,
  email: string,
  password: string,
}

export default class UserModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<User[]> {
    const result = await this.connection
      .execute('SELECT * FROM users');
    const [rows] = result;
    return rows as User[];
  }
}
