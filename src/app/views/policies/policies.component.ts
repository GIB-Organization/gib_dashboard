import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesComponent {
  columns :string[] = ['policyNumber', 'company', 'insuranceType', 'policyOwner', 'policyValue', 'paymentStatus', 'paymentMethod', 'date'] 
  rows = signal([
    {
      id: 1,
      name: 'wasem',
      email: 'example@gmail.com',
      previlige: 'admin',
      createdDate: '25-10-2023',
    }
  ])
}
