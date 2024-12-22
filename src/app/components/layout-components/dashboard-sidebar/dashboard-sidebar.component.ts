import { ChangeDetectionStrategy, Component, Inject, inject } from '@angular/core';
import { BaseLogoComponentComponent } from '../../base-components/base-logo-component/base-logo-component.component';
import { BaseLinkComponentComponent } from "../../base-components/base-link-component/base-link-component.component";
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { ERoutes } from '../../../core/enums';
import { BaseButtonComponentComponent } from "../../base-components/base-button-component/base-button-component.component";
import { AuthStoreService } from '../../../store/authStore/auth-store.service';
import { ILayoutStrategy, LtrDirection, RtlDirection } from '../../../core/classes/LayoutStyleDir';

@Component({
  selector: 'app-dashboard-sidebar',
  standalone: true,
  imports: [BaseLogoComponentComponent, BaseLinkComponentComponent, TranslateModule, BaseButtonComponentComponent],
  templateUrl: './dashboard-sidebar.component.html',
  styleUrl: './dashboard-sidebar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    { provide: 'LtrDirection', useClass: LtrDirection }, // Initial behavior
    { provide: 'RtlDirection', useClass: RtlDirection }, // Initial behavior
  ]
})
export class DashboardSidebarComponent {
  constructor(
    @Inject('LtrDirection') LtrDirection: ILayoutStrategy,
    @Inject('RtlDirection') RtlDirection: ILayoutStrategy,
  ) {
    this.ltrDirection = LtrDirection;
    this.rtlDirection = RtlDirection;
    this.switchDirection = RtlDirection;
  }
  authStoreService = inject(AuthStoreService);
  translate = inject(TranslateService);
  ltrDirection!: ILayoutStrategy;
  rtlDirection!: ILayoutStrategy;
  switchDirection!: ILayoutStrategy;
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
      icon: 'headphones',
      path: ERoutes.tickets
    },
    // {
    //   title: 'promoCodes',
    //   icon: 'megaphone',
    //   path: ERoutes.promoCodes
    // },
    {
      title: 'contactMessages',
      icon: 'phone',
      path: ERoutes.contacts
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

  switchLang() {
    this.switchDirection = this.switchDirection === this.ltrDirection ? this.rtlDirection : this.ltrDirection;
    this.switchDirection.switchDirection();
  }
}
