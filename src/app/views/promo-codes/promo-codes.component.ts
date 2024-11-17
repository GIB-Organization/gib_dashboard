import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { BaseButtonComponentComponent } from "../../components/base-components/base-button-component/base-button-component.component";
import { EShowTableActions } from '../../core/enums';

@Component({
  selector: 'app-promo-codes',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, ButtonModule, BaseButtonComponentComponent],
  templateUrl: './promo-codes.component.html',
  styleUrl: './promo-codes.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PromoCodesComponent {
  columns :string[] = ['codeTitle', 'discount', 'expireDate'] 
  rows = signal([
    {
      id: 1,
      name: 'wasem',
      email: 'example@gmail.com',
      previlige: 'admin',
      createdDate: '25-10-2023',
    }
  ])
  actions = [EShowTableActions.delete, EShowTableActions.edit]
}
