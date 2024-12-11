import { DestroyRef, Injectable, inject } from '@angular/core';
import { PoliciesStore } from './policies-store.store';
import { PoliciesApiService } from '../../services/api/policiesApi/policies-api.service';
import { IErrorResponse, IFilter } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster/toaster.service';
import { Export } from '../../core/classes/Export';

@Injectable({
  providedIn: 'root'
})
export class PoliciesStoreService {
  private api = inject(PoliciesApiService);
  private store = inject(PoliciesStore);
  private toaster = inject(ToasterService);
  
  getPolicies(data: IFilter, ref:DestroyRef) {
    this.store.setLoading(true)
    this.api.getPolicies(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ records: res.result.data, count: res.result.totalRecords });
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  exportPolicies(data: IFilter, ref:DestroyRef) {
    this.store.update({isExporting: true});
    this.api.exportPolicies(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        const EXPORT = new Export();
        EXPORT.fileDownload(res.result, 'policies');
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
