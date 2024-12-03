import { DestroyRef, Injectable, inject } from '@angular/core';
import { StatisticsStore } from './statistics-store.store';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { StatisticsApiService } from '../../services/api/statisticsApi/statistics-api.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsStoreService {
  private api = inject(StatisticsApiService);
  private store = inject(StatisticsStore);
  
  getStatistics(ref:DestroyRef) {
    this.store.setLoading(true)
    this.api.getStatistics().pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ statistics: res.result});
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
}
