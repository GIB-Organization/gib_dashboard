import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatisticCardComponent } from "../../components/views-components/statistics/statistic-card/statistic-card.component";

@Component({
  selector: 'app-statistics-view',
  standalone: true,
  imports: [StatisticCardComponent],
  templateUrl: './statistics-view.component.html',
  styleUrl: './statistics-view.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsViewComponent {

}
