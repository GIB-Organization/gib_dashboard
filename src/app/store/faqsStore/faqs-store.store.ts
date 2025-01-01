import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IFaqsStore } from './faqs-store.interface';

const initValue = () : IFaqsStore =>{
  return{
    faqs:[],
    faqsCount: 0,
    isExporting: false,
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'FaqsStore', resettable: true})
export class FaqsStore extends Store<IFaqsStore> {

  constructor() { super(initValue()) }
}
