import { IBlog, IUser } from "../../models";

export interface IBlogsStore{
  records: IBlog[],
  count: number,
  isProcessing?:boolean,
  record?: IBlog,
  isExporting:boolean
}