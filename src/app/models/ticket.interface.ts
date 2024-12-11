import { ETicketStatus } from "../core/enums";

export interface ITicket{
    id: string,
    subject:string,
    status: ETicketStatus,
    createdDate: string,
    username: string
    messages:IMessage[]
}

export interface IMessage{
    id: string,
    message: string,
    createdDate: string,
    senderId: string,
}

export interface ITicketReply{
    id: string,
    message: string
}

export interface ITicketsMetrics{
    open: number, // number of all open tickets
    close: number // number of all close tickets
}