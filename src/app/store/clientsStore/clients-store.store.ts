import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IClientsStore } from './clients-store.interface';

const initValue = () : IClientsStore =>{
  return{
    records:[],
    count: 0,
    isExporting: false,
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'ClientsStore', resettable: true})
export class ClientsStore extends Store<IClientsStore> {

  constructor() { super(initValue()) }
}
