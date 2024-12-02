import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { IPagingResponse, IResponse } from '../../../models';
import { IFilter } from '../../../models';
import { setUrlQueryParams } from '../../../core/utils/setQueryParams';

@Injectable({
  providedIn: 'root'
})
export class FilterApiService {
  #http = inject(HttpClient)
  /**
   * @param  {string} url
   * @param  {IFilter} params
   * @returns Observable
   */
  getFilteredData(url:string, params:IFilter):Observable<IPagingResponse<any>>{
    return this.#http.get<IPagingResponse<any>>(`${url}`, {params:setUrlQueryParams(params)})
  }

  exportFilteredData(url:string, params:IFilter){
    return this.#http.get<IResponse<string>>(`${url}`, {params:setUrlQueryParams(params)})
  }
}
