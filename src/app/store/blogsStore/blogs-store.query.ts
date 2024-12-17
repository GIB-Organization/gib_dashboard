import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IBlogsStore } from './blogs-store.interface';
import { BlogsStore } from './blogs-store.store';

@Injectable({
  providedIn: 'root'
})
export class BlogsStoreQuery extends Query<IBlogsStore> {
  constructor(private _store: BlogsStore) { 
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
