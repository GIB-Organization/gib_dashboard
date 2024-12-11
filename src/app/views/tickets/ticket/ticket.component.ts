import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import {DividerModule} from 'primeng/divider';
import { BaseBadgeComponentComponent } from "../../../components/base-components/base-badge-component/base-badge-component.component";
import { EColors } from '../../../core/enums';
@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [TranslateModule, BaseButtonComponentComponent, DividerModule, BaseBadgeComponentComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketComponent {
  id = input<string>();
  get EColors(){return EColors}
}
