import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { BaseLinkComponentComponent } from '../../components/base-components/base-link-component/base-link-component.component';
import { ERoutes } from '../../core/enums';
import { TranslateModule } from '@ngx-translate/core';
import { AnimationsContext } from '../../core/animations/animations.class';
import { slideInOutAnimation } from '../../core/animations/animations.animation';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [DividerModule, BaseLinkComponentComponent, TranslateModule, RouterOutlet],
  animations:[slideInOutAnimation],
  templateUrl: './settings.component.html',
  styleUrl: './settings.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent extends AnimationsContext {
  links = [
    {
      title:'generalSettings',
      link: ERoutes.generalSettings,
    },
    {
      title:'seo',
      link: ERoutes.seo,
    },
    {
      title:'changePassword',
      link: ERoutes.changePassword,
    },
  ]
}
