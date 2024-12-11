import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ITicketsStore } from './tickets-store.interface';
import { TicketsStore } from './tickets-store.store';

@Injectable({
  providedIn: 'root'
})
export class TicketsStoreQuery extends Query<ITicketsStore> {
  constructor(private _store: TicketsStore) { 
    super(_store)
  }

  get records$(){
    return this.select(state=> state.records);
  }

  get count$(){
    return this.select(state=> state.count);
  }
  get isExporting$(){
    return this.select(state=> state.isExporting);
  }
  get isProcessing$(){
    return this.select(state=> state.isProcessing);
  }
  get record$(){
    return this.select(state=> state.record);
  }
  get record(){
    return this.store.getValue().record;
  }
  get metrics(){
    return this.store.getValue().metrics;
  }
}
