import { DestroyRef, Injectable, inject } from '@angular/core';
import { TicketsStore } from './tickets-store.store';
import { IErrorResponse, IFilter } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster/toaster.service';
import { Export } from '../../core/classes/Export';
import { TicketsApiService } from '../../services/api/ticketsApi/tickets-api.service';

@Injectable({
  providedIn: 'root'
})
export class TicketsStoreService {
  private api = inject(TicketsApiService);
  private store = inject(TicketsStore);
  private toaster = inject(ToasterService);
  
  getTickets(data: IFilter, ref:DestroyRef) {
    this.store.setLoading(true)
    this.api.getTickets(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ records: res.result.data, count: res.result.totalRecords });
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  exportTickets(data: IFilter, ref:DestroyRef) {
    this.store.update({isExporting: true});
    this.api.exportTickets(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        const EXPORT = new Export();
        EXPORT.fileDownload(res.result, 'tickets');
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
