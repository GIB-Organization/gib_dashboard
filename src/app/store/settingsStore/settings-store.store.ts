import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { ISettingsStore } from './settings-store.interface';

const initValue = () : ISettingsStore =>{
  return{
    isExporting: false,
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'SettingsStore', resettable: true})
export class SettingsStore extends Store<ISettingsStore> {

  constructor() { super(initValue()) }
}
