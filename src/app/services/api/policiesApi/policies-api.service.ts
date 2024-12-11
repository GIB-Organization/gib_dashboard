import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { FilterApiService } from '../filterApi/filter-api.service';
import { HttpClient } from '@angular/common/http';
import { IPolicy, IFilter, IPagingResponse, IResponse } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PoliciesApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private filterService = inject(FilterApiService);
  private path = 'policies'
  private http = inject(HttpClient)
  
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  getPolicies(data:IFilter): Observable<IPagingResponse<IPolicy[]>>{
    return this.filterService.getFilteredData(`${this.baseUrl}/${this.path}/getPolicys`, data);
  }
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  exportPolicies(data:IFilter):Observable<IResponse<string>>{
    return this.filterService.exportFilteredData(`${this.baseUrl}/${this.path}/exportPolicies`, data) as Observable<IResponse<string>>;
  }
}
