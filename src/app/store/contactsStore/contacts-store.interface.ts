import { IContact } from "../../models";

export interface IContactsStore{
  records: IContact[],
  count: number,
  isProcessing?:boolean,
  record?: IContact,
  isExporting:boolean
}