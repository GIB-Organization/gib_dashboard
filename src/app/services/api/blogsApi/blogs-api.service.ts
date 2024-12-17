import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { FilterApiService } from '../filterApi/filter-api.service';
import { HttpClient } from '@angular/common/http';
import { IBlog, IFilter, IPagingResponse, IResponse } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BlogsApiService {
private baseUrl = inject(BASE_URL_TOKEN);
  private filterService = inject(FilterApiService);
  private path = 'blogs'
  private http = inject(HttpClient)
  
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  getBlogs(data:IFilter): Observable<IPagingResponse<IBlog[]>>{
    return this.filterService.getFilteredData(`${this.baseUrl}/${this.path}/getBlogs`, data);
  }
  /**
   * @param  {string} id
   * @returns Observable
   */
  getBlog(id:string):Observable<IResponse<IBlog>>{
    return this.http.get<IResponse<IBlog>>(`${this.baseUrl}/${this.path}/getBlog?id=${id}`);
  }
  /**
   * @param  {IBlog} data
   * @returns Observable
   */
  addBlog(data:IBlog):Observable<IResponse<null>>{
    return this.http.post<IResponse<null>>(`${this.baseUrl}/${this.path}/addBlog`, data);
  }
  /**
   * @param  {IBlog} data
   * @returns Observable
   */
  updateBlog(data:IBlog):Observable<IResponse<null>>{
    return this.http.put<IResponse<null>>(`${this.baseUrl}/${this.path}/updateBlog`, data);
  }
  /**
   * @param  {string} id
   * @returns Observable
   */
  deleteBlog(id:string):Observable<IResponse<null>>{
    return this.http.delete<IResponse<null>>(`${this.baseUrl}/${this.path}/deleteBlog?id=${id}`);
  }
  /**
   * @param  {IFilter} data
   * @returns Observable
   */
  exportBlogs(data:IFilter):Observable<IResponse<string>>{
    return this.filterService.exportFilteredData(`${this.baseUrl}/${this.path}/exportBlogs`, data) as Observable<IResponse<string>>;
  }
}
