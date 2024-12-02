import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { FilterApiService } from '../filterApi/filter-api.service';
import { IFilter, IPagingResponse, IResponse } from '../../../models';
import { IUser } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class UsersApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private filterService = inject(FilterApiService);
  private path = 'users'
  private http = inject(HttpClient)
  
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  getUsers(data:IFilter): Observable<IPagingResponse<IUser[]>>{
    return this.filterService.getFilteredData(`${this.baseUrl}/${this.path}/getUsers`, data);
  }

  updateUser(data:IUser):Observable<IResponse<IUser>>{
    return this.http.put<IResponse<IUser>>(`${this.baseUrl}/${this.path}/updateUser`, data)
  }
  addUser(data:IUser):Observable<IResponse<IUser>>{
    return this.http.post<IResponse<IUser>>(`${this.baseUrl}/${this.path}/addUser`, data)
  }
  getUser(id:string):Observable<IResponse<IUser>>{
    return this.http.get<IResponse<IUser>>(`${this.baseUrl}/${this.path}/getUser?id=${id}`);
  }
  deleteUser(id:string):Observable<IResponse<null>>{
    return this.http.delete<IResponse<null>>(`${this.baseUrl}/${this.path}/deleteUser?id=${id}`);
  }
  exportUsers(data:IFilter){
    return this.filterService.exportFilteredData(`${this.baseUrl}/${this.path}/exportUsers`, data);
  }
}
