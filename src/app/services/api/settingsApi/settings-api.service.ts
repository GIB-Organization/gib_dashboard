import { inject, Injectable } from '@angular/core';
import { BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IChangePassword, IGeneralSettings, IResponse, ISeoSettings } from '../../../models';

@Injectable({
  providedIn: 'root'
})
export class SettingsApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private path = 'settings'
  private http = inject(HttpClient)
  /**
   * @returns Observable
   */
  getGeneralSettings(): Observable<IResponse<IGeneralSettings>> {
    return this.http.get<IResponse<IGeneralSettings>>(`${this.baseUrl}/${this.path}/getGeneralSettings`);
  }
  /**
   * @param  {IGeneralSettings} data
   * @returns Observable
   */
  updateGeneralSettings(data:IGeneralSettings): Observable<IResponse<null>> {
    return this.http.put<IResponse<null>>(`${this.baseUrl}/${this.path}/updateGeneralSettings`, data);
  }
  /**
   * @returns Observable
   */
  getSeoSettings(): Observable<IResponse<ISeoSettings>> {
    return this.http.get<IResponse<ISeoSettings>>(`${this.baseUrl}/${this.path}/getSeoSettings`);
  }
  /**
   * @param  {ISeoSettings} data
   * @returns Observable
   */
  updateSeoSettings(data:ISeoSettings): Observable<IResponse<null>> {
    return this.http.put<IResponse<null>>(`${this.baseUrl}/${this.path}/updateSeoSettings`, data);
  }
  
  /**
   * @param  {IChangePassword} data
   * @returns Observable
   */
  changePassword(data:IChangePassword): Observable<IResponse<null>>{
    return this.http.post<IResponse<null>>(`${this.baseUrl}/${this.path}/changePassword`, data)
  }
}
