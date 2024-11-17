import { ChangeDetectionStrategy, Component } from '@angular/core';
import { StatisticCardComponent } from "../../components/views-components/statistics/statistic-card/statistic-card.component";

@Component({
  selector: 'app-statistics',
  standalone: true,
  imports: [StatisticCardComponent],
  templateUrl: './statistics.component.html',
  styleUrl: './statistics.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticsComponent {

}
