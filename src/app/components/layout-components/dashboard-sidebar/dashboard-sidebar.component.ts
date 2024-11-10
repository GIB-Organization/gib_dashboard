import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseLogoComponentComponent } from '../../base-components/base-logo-component/base-logo-component.component';
import { BaseLinkComponentComponent } from "../../base-components/base-link-component/base-link-component.component";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [BaseLogoComponentComponent, BaseLinkComponentComponent, TranslateModule],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSidebarComponent {
  links : {title:string, icon:string, path:string}[] = [
    {
      title: 'statistics',
      icon: 'chart-line',
      path: '/'
    },
    {
      title: 'manageUsers',
      icon: 'lock',
      path: '/342'
    },
    {
      title: 'docsManagment',
      icon: 'file',
      path: '/ث23ث2'
    },
    {
      title: 'clientsManagment',
      icon: 'users',
      path: '/ثص'
    },
    {
      title: 'tickets',
      icon: 'phone',
      path: '/صص'
    },
    {
      title: 'promoCodes',
      icon: 'megaphone',
      path: '/صضص'
    },
    {
      title: 'settings',
      icon: 'cog',
      path: '/شيض'
    },
  ]
}
