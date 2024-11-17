import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ShowTableComponent } from '../../components/layout-components/show-table/show-table.component';
import { BaseButtonComponentComponent } from "../../components/base-components/base-button-component/base-button-component.component";
import { ButtonModule } from 'primeng/button';
import { EShowTableActions } from '../../core/enums';

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ShowTableComponent, BaseButtonComponentComponent, ButtonModule],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent {
  columns:string[] = ['name','email','previlige','createdDate']
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
