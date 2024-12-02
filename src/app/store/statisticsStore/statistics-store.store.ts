import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IStatisticsStore } from './statistics-store.interface';

const initValue = () : IStatisticsStore =>{
  return{}
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'StatisticsStore', resettable: true})
export class StatisticsStore extends Store<IStatisticsStore> {

  constructor() { super(initValue()) }
}
