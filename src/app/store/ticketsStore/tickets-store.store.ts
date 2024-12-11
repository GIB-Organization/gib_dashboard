import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ITicketsStore } from './tickets-store.interface';

const initValue = () : ITicketsStore =>{
  return{
    records:[],
    count: 0,
    isExporting: false,
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'TicketsStore', resettable: true})
export class TicketsStore extends Store<ITicketsStore> {

  constructor() { super(initValue()) }
}
