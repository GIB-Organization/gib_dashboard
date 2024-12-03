import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseLogoComponentComponent } from '../../base-components/base-logo-component/base-logo-component.component';
import { BaseLinkComponentComponent } from "../../base-components/base-link-component/base-link-component.component";
import { TranslateModule } from '@ngx-translate/core';
import { ERoutes } from '../../../core/enums';
import { BaseButtonComponentComponent } from "../../base-components/base-button-component/base-button-component.component";
import { AuthStoreService } from '../../../store/authStore/auth-store.service';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [BaseLogoComponentComponent, BaseLinkComponentComponent, TranslateModule, BaseButtonComponentComponent],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardSidebarComponent {
  authStoreService = inject(AuthStoreService);
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
