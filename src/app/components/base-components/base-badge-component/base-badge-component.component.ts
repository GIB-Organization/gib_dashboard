import { ChangeDetectionStrategy, Component, computed, input } from '@angular/core';
import { EColors } from '../../../core/enums';

@Component({
  selector: 'app-base-badge-component',
  standalone: true,
  imports: [],
  templateUrl: './base-badge-component.component.html',
  styleUrl: './base-badge-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseBadgeComponentComponent {
  colorVar = input<EColors>(EColors.blue);
  color = computed(()=> `var(--${this.colorVar()}-500)`)
  background = computed(()=> `var(--${this.colorVar()}-100)`)
}
