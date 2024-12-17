import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ITicketsStore } from './tickets-store.interface';
import { TicketsStore } from './tickets-store.store';
import { Observable } from 'rxjs';
import { ITicket } from '../../models';
import { ETicketStatus } from '../../core/enums';

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
  get record$():Observable<ITicket>{
    return this.select(state=> state.record as ITicket);
  }
  get recordStatus$(){
    return this.select(state=> state.record?.status??ETicketStatus.open);
  }
  get record(){
    return this.store.getValue().record;
  }
  get metrics$(){
    return this.select(state=> state.metrics);
  }
}
