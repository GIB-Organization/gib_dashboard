import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IClientsStore } from './clients-store.interface';
import { ClientsStore } from './clients-store.store';

@Injectable({
  providedIn: 'root'
})
export class ClientsStoreQuery extends Query<IClientsStore> {
  constructor(private _store: ClientsStore) { 
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
}
