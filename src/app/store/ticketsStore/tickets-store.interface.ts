import { ITicket, ITicketsMetrics } from "../../models";

export interface ITicketsStore{
  records: ITicket[],
  count: number,
  isProcessing?:boolean,
  record?: ITicket,
  isExporting:boolean,
  metrics?:ITicketsMetrics
}