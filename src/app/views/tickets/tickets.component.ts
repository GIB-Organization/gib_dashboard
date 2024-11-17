import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { StatisticCardComponent } from "../../components/views-components/statistics/statistic-card/statistic-card.component";
import { EShowTableActions } from '../../core/enums';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, ButtonModule, StatisticCardComponent],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent {
  columns :string[] = ['username', 'messageTitle', 'dateTime', 'status'] 
  rows = signal([
    {
      id: 1,
      name: 'wasem',
      email: 'example@gmail.com',
      previlige: 'admin',
      createdDate: '25-10-2023',
    }
  ])
  actions = [EShowTableActions.show]
}
