import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { FilterApiService } from '../filterApi/filter-api.service';
import { HttpClient } from '@angular/common/http';
import { IFaq, IFilter, IPagingResponse, IResponse } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FaqsApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private filterService = inject(FilterApiService);
  private path = 'faqs'
  private http = inject(HttpClient)
  
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  getFaqs(data:IFilter): Observable<IPagingResponse<IFaq[]>>{
    return this.filterService.getFilteredData(`${this.baseUrl}/${this.path}/getFaqs`, data);
  }
  /**
   * @param  {string} id
   * @returns Observable
   */
  getFaq(id:string):Observable<IResponse<IFaq>>{
    return this.http.get<IResponse<IFaq>>(`${this.baseUrl}/${this.path}/getFaq?id=${id}`);
  }
  /**
   * @param  {IFaq} data
   * @returns Observable
   */
  addFaq(data:IFaq):Observable<IResponse<null>>{
    return this.http.post<IResponse<null>>(`${this.baseUrl}/${this.path}/addFaq`, data);
  }
  /**
   * @param  {IFaq} data
   * @returns Observable
   */
  updateFaq(data:IFaq):Observable<IResponse<null>>{
    return this.http.put<IResponse<null>>(`${this.baseUrl}/${this.path}/updateFaq`, data);
  }
  /**
   * @param  {string} id
   * @returns Observable
   */
  deleteFaq(id:string):Observable<IResponse<null>>{
    return this.http.delete<IResponse<null>>(`${this.baseUrl}/${this.path}/deleteFaq?id=${id}`);
  }
}
