import { inject, Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { IContactsStore } from './contacts-store.interface';
import { ContactsStore } from './contacts-store.store';
import { LanguageService } from '../../services/language/language.service';

@Injectable({
  providedIn: 'root'
})
export class ContactsStoreQuery extends Query<IContactsStore> {
  translate = inject(LanguageService);
  constructor(private _store: ContactsStore) { 
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
