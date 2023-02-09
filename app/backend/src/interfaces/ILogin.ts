export interface ICredentials {
  email: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
}

export interface IVerify {
  email: string
}

export interface IToken {
  id: number;
  username: string;
  email: string;
  role: string;
}

export interface IRole {
  role: string,
}
