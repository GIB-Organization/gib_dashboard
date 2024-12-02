import { inject, Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IAuthStore } from './auth-store.interface';
import { AuthStore } from './auth-store.store';
import { ILoginResponse, IRefreshTokenDTO } from '../../models/auth.interface';
import { AuthService } from '../../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreQuery extends Query<IAuthStore> {
  authService = inject(AuthService);
  constructor(private _store: AuthStore) { 
    super(_store)
  }

  get user(){
    return this._store.getValue().authData;
  }
  set setUser(user:ILoginResponse){
    const USER = this.authService.getUserFromToken((user.token) as IRefreshTokenDTO)
    this._store.update({authData:USER});
    this.authService.saveUserToLocal(USER);
  }
  get userId(){
    return this._store.getValue().authData?.id
  }
  get email(){
    return this._store.getValue().authData?.email??''
  }
  get phoneNumber(){
    return this._store.getValue().authData?.phoneNumber??''
  }
  get fullName(){
    return this._store.getValue().authData?.fullName??''
  }
  get token(){
    return this._store.getValue().authData?.token??null
  }

  get isAuthenticated(){
    return !!this.token
  }
  get isAuthenticated$(){
    return this.select(state=> state.authData?.token);
  }

}
