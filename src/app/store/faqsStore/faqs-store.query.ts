import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IFaqsStore } from './faqs-store.interface';
import { FaqsStore } from './faqs-store.store';

@Injectable({
  providedIn: 'root'
})
export class FaqsStoreQuery extends Query<IFaqsStore> {
  constructor(private _store: FaqsStore) { 
    super(_store)
  }

  get faqs$(){
    return this.select(state=> state.faqs);
  }

  get faqsCount$(){
    return this.select(state=> state.faqsCount);
  }
  get isExporting$(){
    return this.select(state=> state.isExporting);
  }
  get isProcessing$(){
    return this.select(state=> state.isProcessing);
  }
  get faq$(){
    return this.select(state=> state.faq);
  }
  get faq(){
    return this.store.getValue().faq;
  }
}
