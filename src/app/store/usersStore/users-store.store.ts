import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IUsersStore } from './users-store.interface';

const initValue = () : IUsersStore =>{
  return{
    users:[],
    usersCount: 0,
    isExporting: false,
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'UsersStore', resettable: true})
export class UsersStore extends Store<IUsersStore> {

  constructor() { super(initValue()) }
}
