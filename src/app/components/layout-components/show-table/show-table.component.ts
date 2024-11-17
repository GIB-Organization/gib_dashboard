import { ChangeDetectionStrategy, Component, contentChild, input, TemplateRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { EShowTableActions } from '../../../core/enums';
import { NgTemplateOutlet } from '@angular/common';
import { BaseButtonComponentComponent } from '../../base-components/base-button-component/base-button-component.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule } from 'primeng/paginator';
@Component({
  selector: 'app-show-table',
  standalone: true,
  imports: [TableModule, TranslateModule, NgTemplateOutlet, BaseButtonComponentComponent, InputGroupModule, ButtonModule, PaginatorModule],
  templateUrl: './show-table.component.html',
  styleUrl: './show-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowTableComponent {
  itemsTemplate = contentChild.required<TemplateRef<any>>('itemsTemplate')
  columns = input.required<string[]>();
  rows = input.required<any[]>();
  isActions = input<boolean>(false);
  isLoading = input<boolean>(false);
  actions = input<EShowTableActions[]>([]);
  get EShowTableActions(){return EShowTableActions};
}
