import { inject, Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IPoliciesStore } from './policies-store.interface';
import { PoliciesStore } from './policies-store.store';
import { LanguageService } from '../../services/language/language.service';

@Injectable({
  providedIn: 'root'
})
export class PoliciesStoreQuery extends Query<IPoliciesStore> {
  translate = inject(LanguageService);
  constructor(private _store: PoliciesStore) { 
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
  get companyNameKey(): 'companyNameAr' | 'companyNameEn'{
    return this.translate.handleBackendLocalKeys('companyName')
  }
}
