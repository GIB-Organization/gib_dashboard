import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { FilterApiService } from '../filterApi/filter-api.service';
import { HttpClient } from '@angular/common/http';
import { IClient, IFilter, IPagingResponse, IResponse } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClientsApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private filterService = inject(FilterApiService);
  private path = 'clients'
  private http = inject(HttpClient)
  
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  getClients(data:IFilter): Observable<IPagingResponse<IClient[]>>{
    return this.filterService.getFilteredData(`${this.baseUrl}/${this.path}/getClients`, data);
  }
  /**
   * @param  {string} id
   * @returns Observable
   */
  getClient(id:string):Observable<IResponse<IClient>>{
    return this.http.get<IResponse<IClient>>(`${this.baseUrl}/${this.path}/getClient?id=${id}`);
  }
  /**
   * @param  {string} id
   * @returns Observable
   */
  deleteClient(id:string):Observable<IResponse<null>>{
    return this.http.delete<IResponse<null>>(`${this.baseUrl}/${this.path}/deleteClient?id=${id}`);
  }
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  exportClients(data:IFilter):Observable<IResponse<string>>{
    return this.filterService.exportFilteredData(`${this.baseUrl}/${this.path}/exportClients`, data) as Observable<IResponse<string>>;
  }
}
