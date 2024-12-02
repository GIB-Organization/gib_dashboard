import { DestroyRef, Injectable, inject } from '@angular/core';
import { StatisticsStore } from './statistics-store.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster/toaster.service';
import { StatisticsApiService } from '../../services/api/statisticsApi/statistics-api.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsStoreService {
  private api = inject(StatisticsApiService);
  private store = inject(StatisticsStore);
  private toaster = inject(ToasterService);
  
  getStatistics(ref:DestroyRef) {
    this.store.setLoading(true)
    this.api.getStatistics().pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ statistics: res.result});
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toaster.addError()
        this.store.setLoading(false)
      }
    });
  }
}
