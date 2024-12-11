import { IFilter } from "../../models";
import { EQuotationTypeFilter, ETicketStatusFilter } from "../enums";
import { Pagination } from "./Pagination";

export class Filter extends Pagination implements IFilter{
    searchText?: string='';
    constructor(){
        super()
    }
}

export class PoliciesFilter extends Filter implements IFilter{
    type: EQuotationTypeFilter = EQuotationTypeFilter.all
}

export class TicketsFilter extends Filter implements IFilter{
    type: ETicketStatusFilter = ETicketStatusFilter.all
}