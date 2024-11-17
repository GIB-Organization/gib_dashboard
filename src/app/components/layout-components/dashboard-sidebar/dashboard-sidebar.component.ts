import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseLogoComponentComponent } from '../../base-components/base-logo-component/base-logo-component.component';
import { BaseLinkComponentComponent } from "../../base-components/base-link-component/base-link-component.component";
import { TranslateModule } from '@ngx-translate/core';
import { ERoutes } from '../../../core/enums';

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
      path: ERoutes.statistics
    },
    {
      title: 'manageUsers',
      icon: 'lock',
      path: ERoutes.users
    },
    {
      title: 'docsManagment',
      icon: 'file',
      path: ERoutes.policies
    },
    {
      title: 'clientsManagment',
      icon: 'users',
      path: ERoutes.clients
    },
    {
      title: 'tickets',
      icon: 'phone',
      path: ERoutes.tickets
    },
    {
      title: 'promoCodes',
      icon: 'megaphone',
      path: ERoutes.promoCodes
    },
    {
      title: 'blogs',
      icon: 'file-edit',
      path: ERoutes.blogs
    },
    {
      title: 'settings',
      icon: 'cog',
      path: ERoutes.settings
    },
  ]
}
