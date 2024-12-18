import { DestroyRef, Injectable, inject } from '@angular/core';
import { ContactsStore } from './contacts-store.store';
import { ContactsApiService } from '../../services/api/contactsApi/contacts-api.service';
import { IErrorResponse, IFilter } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster/toaster.service';
import { Export } from '../../core/classes/Export';
import { helpers } from '../../core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class ContactsStoreService {
  private api = inject(ContactsApiService);
  private store = inject(ContactsStore);
  private toaster = inject(ToasterService);

  getContacts(data: IFilter, ref: DestroyRef) {
    this.store.setLoading(true)
    this.api.getContacts(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ records: res.result.data, count: res.result.totalRecords });
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }

  deleteContact(id: string, index: number, ref: DestroyRef) {
    this.store.setLoading(true)
    return this.api.deleteContact(id).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.toaster.addSuccess()
        this.store.update({
          isProcessing: false,
          records: helpers.deleteItemInList(this.store.getValue().records, index)
        })
      },
      complete: () => { this.store.setLoading(false) },
      error: (err: IErrorResponse) => {
        this.toaster.addError(err.error.message)
        this.store.setLoading(false)
      }
    })
  }

  exportContacts(data: IFilter, ref: DestroyRef) {
    this.store.update({ isExporting: true });
    this.api.exportContacts(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        const EXPORT = new Export();
        EXPORT.fileDownload(res.result, 'contacts');
        this.toaster.addSuccess()
      },
      complete: () => this.store.update({ isExporting: false }),
      error: (err: IErrorResponse) => {
        this.toaster.addError(err.error.message)
        this.store.update({ isExporting: false })
      }
    });
  }
}
