import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IUsersStore } from './users-store.interface';
import { UsersStore } from './users-store.store';

@Injectable({
  providedIn: 'root'
})
export class UsersStoreQuery extends Query<IUsersStore> {
  constructor(private _store: UsersStore) { 
    super(_store)
  }

  get users$(){
    return this.select(state=> state.users);
  }

  get usersCount$(){
    return this.select(state=> state.usersCount);
  }
  get isExporting$(){
    return this.select(state=> state.isExporting);
  }
  get isProcessing$(){
    return this.select(state=> state.isProcessing);
  }
  get user$(){
    return this.select(state=> state.user);
  }
  get user(){
    return this.store.getValue().user;
  }
}
