import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { BaseButtonComponentComponent } from "../../components/base-components/base-button-component/base-button-component.component";
import { EShowTableActions } from '../../core/enums';
import { DialogComponentComponent } from "../../components/shared-components/dialog-component/dialog-component.component";
import { PromoCodeFormComponent } from "../../components/views-components/promo-codes/promo-code-form/promo-code-form.component";

@Component({
  selector: 'app-promo-codes',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, ButtonModule, BaseButtonComponentComponent, DialogComponentComponent, PromoCodeFormComponent],
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
  actions = [EShowTableActions.delete, EShowTableActions.update]
  showDialog = signal<boolean>(false);
}
