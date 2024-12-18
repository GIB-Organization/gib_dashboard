import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { FilterApiService } from '../filterApi/filter-api.service';
import { HttpClient } from '@angular/common/http';
import { IContact, IFilter, IPagingResponse, IResponse } from '../../../models';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ContactsApiService {
private baseUrl = inject(BASE_URL_TOKEN);
  private filterService = inject(FilterApiService);
  private path = 'contacts'
  private http = inject(HttpClient)
  
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  getContacts(data:IFilter): Observable<IPagingResponse<IContact[]>>{
    return this.filterService.getFilteredData(`${this.baseUrl}/${this.path}/getContacts`, data);
  }
  /**
   * @param  {string} id
   * @returns Observable
   */
  deleteContact(id:string):Observable<IResponse<null>>{
    return this.http.delete<IResponse<null>>(`${this.baseUrl}/${this.path}/deleteContact?id=${id}`);
  }
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  exportContacts(data:IFilter):Observable<IResponse<string>>{
    return this.filterService.exportFilteredData(`${this.baseUrl}/${this.path}/exportContacts`, data) as Observable<IResponse<string>>;
  }
}
