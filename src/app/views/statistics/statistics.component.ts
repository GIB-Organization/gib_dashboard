import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { StatisticCardComponent } from "../../components/views-components/statistics/statistic-card/statistic-card.component";
import { StatisticsStoreService } from '../../store/statisticsStore/statistics-store.service';
import { StatisticsStoreQuery } from '../../store/statisticsStore/statistics-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingContentComponentComponent } from "../../components/shared-components/loading-content-component/loading-content-component.component";
import { CurrencyPipe } from '@angular/common';
import { BaseLinkComponentComponent } from "../../components/base-components/base-link-component/base-link-component.component";
import { ERoutes } from '../../core/enums';

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [StatisticCardComponent, LoadingContentComponentComponent, CurrencyPipe, BaseLinkComponentComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent implements OnInit {
  statisitcsStoreService = inject(StatisticsStoreService)
  statisticsStoreQuery = inject(StatisticsStoreQuery)
  statistics = toSignal(this.statisticsStoreQuery.statistics$);
  isLoading = toSignal(this.statisticsStoreQuery.selectLoading());
  ref = inject(DestroyRef);
  get ERoutes(){ return ERoutes}

  ngOnInit(): void {
    this.statisitcsStoreService.getStatistics(this.ref)
  }
}
