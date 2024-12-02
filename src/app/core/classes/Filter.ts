import { IFilter } from "../../models";
import { Pagination } from "./Pagination";

export class Filter extends Pagination implements IFilter{
    searchText?: string='';
    constructor(){
        super()
    }
}