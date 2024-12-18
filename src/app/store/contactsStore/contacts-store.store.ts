import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IContactsStore } from './contacts-store.interface';

const initValue = () : IContactsStore =>{
  return{
    records:[],
    count: 0,
    isExporting: false,
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'ContactsStore', resettable: true})
export class ContactsStore extends Store<IContactsStore> {

  constructor() { super(initValue()) }
}
