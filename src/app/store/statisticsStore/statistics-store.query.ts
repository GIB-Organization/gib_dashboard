import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IStatisticsStore } from './statistics-store.interface';
import { StatisticsStore } from './statistics-store.store';

@Injectable({
  providedIn: 'root'
})
export class StatisticsStoreQuery extends Query<IStatisticsStore> {
  constructor(private _store: StatisticsStore) { 
    super(_store)
  }

  get statistics$(){
    return this.select(state=> state.statistics);
  }
}
