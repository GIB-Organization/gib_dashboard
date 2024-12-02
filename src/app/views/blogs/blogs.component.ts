import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { BaseButtonComponentComponent } from "../../components/base-components/base-button-component/base-button-component.component";
import { EShowTableActions } from '../../core/enums';

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, ButtonModule, BaseButtonComponentComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsComponent {
  columns :string[] = ['titleAr', 'titleEn', 'image','postDate'] 
  rows = signal([
    {
      id: 1,
      name: 'wasem',
      email: 'example@gmail.com',
      previlige: 'admin',
      createdDate: '25-10-2023',
    }
  ])
  actions = [EShowTableActions.delete, EShowTableActions.read, EShowTableActions.update]
}
