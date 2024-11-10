import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-statistic-card',
  standalone: true,
  imports: [TranslateModule, AvatarModule],
  templateUrl: './statistic-card.component.html',
  styleUrl: './statistic-card.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StatisticCardComponent {
  background = input<string>();
  title = input.required<string>();
  value = input<number>();
}
