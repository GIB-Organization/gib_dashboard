import { Injectable } from '@angular/core';
import { Query } from '@datorama/akita';
import { ISettingsStore } from './settings-store.interface';
import { SettingsStore } from './settings-store.store';

@Injectable({
  providedIn: 'root'
})
export class SettingsStoreQuery extends Query<ISettingsStore> {
  constructor(private _store: SettingsStore) { 
    super(_store)
  }

  get generalSettings$(){
    return this.select(state=> state.generalSettings);
  }
  get seoSettings$(){
    return this.select(state=> state.seoSettings);
  }
  get isProcessing$(){
    return this.select(state=> state.isProcessing);
  }

}
