import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { ERoutes } from '../../enums';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private authStoreQuery: AuthStoreQuery, @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (!this.authStoreQuery.isAuthenticated) {
        this.router.navigate([`/${ERoutes.login}`]);
        return false;
      }
      return true
    }
    return false;
  }
}

@Injectable({
  providedIn: 'root',
})
export class GuestGuard implements CanActivate {
  constructor(private router: Router, private authStoreQuery: AuthStoreQuery, @Inject(PLATFORM_ID) private platformId: Object) { }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (this.authStoreQuery.isAuthenticated) {
        this.router.navigate(['/']);
        return false;
      }
      return true
    }
    return false
  }
}
