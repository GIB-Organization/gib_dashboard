import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { EShowTableActions } from '../../core/enums';
import { DialogComponentComponent } from "../../components/shared-components/dialog-component/dialog-component.component";
import { ClientDataComponent } from "../../components/views-components/clients/client-data/client-data.component";

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, ButtonModule, DialogComponentComponent, ClientDataComponent],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent {
  columns :string[] = ['name', 'email', 'phone', 'nationalId'] 
  rows = signal([
    {
      id: 1,
      name: 'wasem',
      email: 'example@gmail.com',
      previlige: 'admin',
      createdDate: '25-10-2023',
    }
  ])
  actions = [EShowTableActions.delete, EShowTableActions.read]
  showDialog = signal<boolean>(false);
}
