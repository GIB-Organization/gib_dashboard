import { Router } from '@angular/router';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { FaqsStore } from './faqs-store.store';
import { FaqsApiService } from '../../services/api/faqsApi/faqs-api.service';
import { IErrorResponse, IFilter, IFaq } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster/toaster.service';
import { Export } from '../../core/classes/Export';
import { ERoutes } from '../../core/enums';
import { helpers } from '../../core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class FaqsStoreService {
  private api = inject(FaqsApiService);
  private store = inject(FaqsStore);
  private toaster = inject(ToasterService);
  private router = inject(Router);
  
  getFaqs(data: IFilter, ref:DestroyRef) {
    this.store.setLoading(true)
    this.api.getFaqs(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ faqs: res.result.data, faqsCount: res.result.totalRecords });
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  getFaq(id: string, ref:DestroyRef, callback?:any) {
    this.store.setLoading(true)
    this.api.getFaq(id).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ faq: res.result});
        callback()
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  addFaq(data: IFaq, ref:DestroyRef) {
    this.store.update({isProcessing: true})
    this.api.addFaq(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.toaster.addSuccess()
        this.router.navigate([`/${ERoutes.faqs}`]);
      },
      complete: () => this.store.update({isProcessing: false}),
      error: (err:IErrorResponse) => {
        this.toaster.addError(err.error.message)
        this.store.update({isProcessing: false})
      }
    });
  }
  updateFaq(data:IFaq, ref:DestroyRef){
    this.store.update({isProcessing: true})
    return this.api.updateFaq(data).pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
          this.toaster.addSuccess()
          this.router.navigate([`/${ERoutes.faqs}`]);
        },
        complete:()=>{this.store.update({isProcessing: false})},
        error:(err:IErrorResponse)=>{
          this.toaster.addError(err.error.message)
          this.store.update({isProcessing: false})
        }
    })
  }
  deleteFaq(id:string, index:number, ref:DestroyRef){
    this.store.setLoading(true)
    return this.api.deleteFaq(id).pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
          this.toaster.addSuccess()
          const USERS = [...this.store.getValue().faqs];
          USERS.splice(index, 1);
          this.store.update({
            isProcessing: false,
            faqs: helpers.deleteItemInList(this.store.getValue().faqs, index)
          })
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err:IErrorResponse)=>{
          this.toaster.addError(err.error.message)
          this.store.setLoading(false)
        }
    })
  }
}
