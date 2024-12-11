export interface IPagination{
    limit: number,
    page: number
}

export interface IFilter extends IPagination{
    searchText?: string,
    type?:any
}