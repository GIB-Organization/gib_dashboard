import { DestroyRef, Injectable, inject } from '@angular/core';
import { ClientsStore } from './clients-store.store';
import { ClientsApiService } from '../../services/api/clientsApi/clients-api.service';
import { IErrorResponse, IFilter } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster/toaster.service';
import { Export } from '../../core/classes/Export';
import { helpers } from '../../core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class ClientsStoreService {
  private api = inject(ClientsApiService);
  private store = inject(ClientsStore);
  private toaster = inject(ToasterService);
  
  getClients(data: IFilter, ref:DestroyRef) {
    this.store.setLoading(true)
    this.api.getClients(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ records: res.result.data, count: res.result.totalRecords });
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  getClient(id: string, ref:DestroyRef, callback?:any) {
    this.store.setLoading(true)
    this.api.getClient(id).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ record: res.result});
        callback?.()
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  deleteClient(id:string, index:number, ref:DestroyRef){
    this.store.setLoading(true)
    return this.api.deleteClient(id).pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
          this.toaster.addSuccess()
          this.store.update({
            isProcessing: false,
            records: helpers.deleteItemInList(this.store.getValue().records, index)
          })
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err:IErrorResponse)=>{
          this.toaster.addError(err.error.message)
          this.store.setLoading(false)
        }
    })
  }

  exportClients(data: IFilter, ref:DestroyRef) {
    this.store.update({isExporting: true});
    this.api.exportClients(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        const EXPORT = new Export();
        EXPORT.fileDownload(res.result, 'clients');
        this.toaster.addSuccess()
      },
      complete: () => this.store.update({isExporting: false}),
      error: (err:IErrorResponse) => {
        this.toaster.addError(err.error.message)
        this.store.update({isExporting: false})
      }
    });
  }
}
