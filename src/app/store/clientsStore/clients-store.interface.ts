import { IClient, IUser } from "../../models";

export interface IClientsStore{
  records: IClient[],
  count: number,
  isProcessing?:boolean,
  record?: IClient,
  isExporting:boolean
}