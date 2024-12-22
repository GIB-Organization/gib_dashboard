import { IResponse } from './../../../models';
import { Injectable, inject } from '@angular/core';
import { BASE_URL_TOKEN, SITE_BASE_URL_TOKEN } from '../../../core/injection-tokens/base-url.token';
import { HttpClient } from '@angular/common/http';
import { IChangeInfo, IChangePassword, IForgotPassword, ILoginDTO, ILoginResponse, IRefreshTokenDTO, IResetPassword } from '../../../models';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private baseUrl = inject(BASE_URL_TOKEN);
  private siteBaseUrl = inject(SITE_BASE_URL_TOKEN);
  public path = 'auth'
  public refreshPath = 'refreshToken'
  private http = inject(HttpClient)
  /**
   * @param  {ILoginDTO} data
   * @returns Observable
   */
  login(data:ILoginDTO): Observable<IResponse<ILoginResponse>>{
    return this.http.post<IResponse<ILoginResponse>>(`${this.baseUrl}/${this.path}/login`, data)
  }
  /**
   * @param  {IRefreshTokenDTO} data
   * @returns Observable
   */
  refreshToken(data:IRefreshTokenDTO | null): Observable<IResponse<IRefreshTokenDTO>>{
    return this.http.post<IResponse<IRefreshTokenDTO>>(`${this.siteBaseUrl}/account/${this.refreshPath}`, data)
  }
  /**
   * @param  {IChangeInfo} data
   * @returns Observable
   */
  changeInfo(data:IChangeInfo): Observable<IResponse<ILoginResponse>>{
    return this.http.post<IResponse<ILoginResponse>>(`${this.baseUrl}/${this.path}/changeInfo`, data)
  }
  /**
   * @param  {IForgotPassword} data
   * @returns Observable
   */
  forgotPassword(data:IForgotPassword): Observable<IResponse<string>>{
    return this.http.post<IResponse<string>>(`${this.baseUrl}/${this.path}/sendForgotPasswordOtp`, data)
  }
  /**
   * @param  {IResetPassword} data
   * @returns Observable
   */
  resetPassword(data:IResetPassword): Observable<IResponse<null>>{
    return this.http.post<IResponse<null>>(`${this.baseUrl}/${this.path}/resetPassword`, data)
  }
}
