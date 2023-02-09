interface IData {
  message: string
}

export interface IError {
  status: number;
  data: IData
}