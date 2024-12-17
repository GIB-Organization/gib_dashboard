import { Injectable } from '@angular/core';
import { Store, StoreConfig } from '@datorama/akita';
import { IBlogsStore } from './blogs-store.interface';

const initValue = () : IBlogsStore =>{
  return{
    records:[
      {
        id: '',
        slug: '',
        imageUrl: 'https://placehold.co/600x400',
        titleAr: '',
        titleEn: '',
        createdDate: '',
        descriptionAr: '',
        descriptionEn: ''
      }
    ],
    count: 0,
    isExporting: false,
  }
}
@Injectable({
  providedIn: 'root'
})
@StoreConfig({name:'BlogsStore', resettable: true})
export class BlogsStore extends Store<IBlogsStore> {

  constructor() { super(initValue()) }
}
