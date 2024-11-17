import { ERoutes } from './../../../core/enums/routes.enum';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseLogoComponentComponent } from "../../../components/base-components/base-logo-component/base-logo-component.component";
import { BaseLabelComponentComponent } from "../../../components/base-components/base-label-component/base-label-component.component";
import {PasswordModule} from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from "../../../components/base-components/base-button-component/base-button-component.component";
import { BaseLinkComponentComponent } from "../../../components/base-components/base-link-component/base-link-component.component";
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [BaseLogoComponentComponent, BaseLabelComponentComponent, PasswordModule, TranslateModule, BaseButtonComponentComponent, BaseLinkComponentComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginComponent {

  get ERoutes(){return ERoutes}

}
