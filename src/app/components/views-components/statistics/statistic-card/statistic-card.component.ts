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
  classes = input<string>('text-white');
  background = input<string>();
  title = input.required<string>();
  value = input.required<number | string | null>();
  icon = input<string>('chart-bar');
  iconColor = input<string>('var(--orange-600)');
  iconBg = input<string>('var(--surface-0)');
  
}
