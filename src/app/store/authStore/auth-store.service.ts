import { Injectable, inject } from '@angular/core';
import { AuthApiService } from '../../services/api/authApi/auth-api.service';
import { AuthStore } from './auth-store.store';
import { IChangePassword, IForgotPassword, ILoginDTO, IRefreshTokenDTO, IResetPassword } from '../../models/auth.interface';
import { take } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth/auth.service';
import { ToasterService } from '../../services/toaster/toaster.service';
import { AuthStoreQuery } from './auth-store.query';
import { IErrorResponse } from '../../models/response.interface';
import { EQueryParams, ERoutes } from '../../core/enums';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {
  private api = inject(AuthApiService);
  private store = inject(AuthStore);
  private authService = inject(AuthService);
  private authStoreQuery = inject(AuthStoreQuery);
  private toasterService = inject(ToasterService);
  private router = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  getUserFromLocal() {
    this.store.update({
      authData: this.authService.getUserFromLocal()
    })
  }
  logout(){
    this.store.reset();
    this.authService.logout();
    this.router.navigate([ERoutes.login]);
  }
  /**
   * @param  {ILoginDTO} data
   */
  login(data: ILoginDTO) {
    this.store.setLoading(true)
    this.api.login(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.toasterService.addSuccess()
        this.authStoreQuery.setUser = res.result;
        this.afterLoginRedirect();
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setError(err.error)
        this.toasterService.addError(err.error)
        this.store.setLoading(false)
      }
    });
  }

  afterLoginRedirect(){
    const redirect = this.activatedRoute.snapshot.queryParams[EQueryParams.redirectTo]
    console.log(redirect)
    this.router.navigate([ redirect || '/']);
  }
  /**
   * @param  {IRefreshTokenDTO} data
   */
  refreshToken(data: IRefreshTokenDTO) {
    this.store.setLoading(true)
    this.api.refreshToken(data).pipe(take(1)).subscribe({
      next: (res) => {
        this.authStoreQuery.setUser = {
          ...this.authStoreQuery.user,
          token:res.result
        }
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setError(err)
        this.store.setLoading(false)
      }
    });
  }
  /**
   * @param  {IChangePassword} data
   */
  changePassword(data: IChangePassword) {
    this.store.setLoading(true)
    this.api.changePassword(data).pipe(take(1)).subscribe({
      next: () => {
        this.toasterService.addSuccess()
      },
      complete: () => this.store.setLoading(false),
      error: (err:IErrorResponse) => {
        this.store.setError(err)
        this.store.setLoading(false)
        this.toasterService.addError(err.error.message ?? 'customRequestErrors.wrongPassword')
      }
    });
  }


  forgotPassword(data: IForgotPassword) {
    this.store.setLoading(true)
    this.api.forgotPassword(data).pipe(take(1)).subscribe({
      next: (res) => {
        // this.store.update({ otp: res.result });
      },
      complete: () => this.store.setLoading(false),
      error: (err:IErrorResponse) => {
        this.toasterService.addError(err.error.message)
        this.store.setLoading(false)
      }
    });
  }

  resetPassword(data: IResetPassword) {
    this.store.setLoading(true)
    this.api.resetPassword(data).pipe(take(1)).subscribe({
      next: () => {
        this.toasterService.addSuccess('views.auth.passwordChanged')
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toasterService.addError('customRequestErrors.invalidEmailOrId')
        this.store.setLoading(false)
      }
    });
  }
}
