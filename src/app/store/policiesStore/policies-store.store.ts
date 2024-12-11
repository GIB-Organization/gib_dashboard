import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IPoliciesStore } from './policies-store.interface';

const initValue = () : IPoliciesStore =>{
  return{
    records:[],
    count: 0,
    isExporting: false,
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'PoliciesStore', resettable: true})
export class PoliciesStore extends Store<IPoliciesStore> {

  constructor() { super(initValue()) }
}
