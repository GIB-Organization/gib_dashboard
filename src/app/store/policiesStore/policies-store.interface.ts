import { IPolicy } from "../../models";

export interface IPoliciesStore{
  records: IPolicy[],
  count: number,
  isProcessing?:boolean,
  record?: IPolicy,
  isExporting:boolean
}