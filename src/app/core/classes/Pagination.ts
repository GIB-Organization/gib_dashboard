import { IPagination } from "../../models/filter.interface";

export class Pagination implements IPagination{
    limit: number;
    page: number;
    constructor(limit:number = 10, page:number = 1){
        this.limit = limit;
        this.page = page;
    }
}