import { ERoutes } from './../../../core/enums/routes.enum';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseLogoComponentComponent } from "../../../components/base-components/base-logo-component/base-logo-component.component";
import { BaseLabelComponentComponent } from "../../../components/base-components/base-label-component/base-label-component.component";
import { PasswordModule } from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from "../../../components/base-components/base-button-component/base-button-component.component";
import { BaseLinkComponentComponent } from "../../../components/base-components/base-link-component/base-link-component.component";
import { IForgotPassword, IForgotPasswordFormGroup, ILoginDTO, ILoginDTOFormGroup } from '../../../models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VALIDATORS } from '../../../core/validations';
import { InputValidationAlertComponentComponent } from "../../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component";
import { AuthStoreService } from '../../../store/authStore/auth-store.service';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { toSignal } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [BaseLogoComponentComponent, BaseLabelComponentComponent, PasswordModule, TranslateModule, BaseButtonComponentComponent, BaseLinkComponentComponent, InputValidationAlertComponentComponent, ReactiveFormsModule],
  templateUrl: './forgot-password.component.html',
  styleUrl: './forgot-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ForgotPasswordComponent {
  #fb = inject(FormBuilder);
  authStoreService = inject(AuthStoreService);
  authStoreQuery = inject(AuthStoreQuery);
  isLoading = toSignal(this.authStoreQuery.selectLoading());
  form = this.#fb.group<IForgotPasswordFormGroup>({
    email: this.#fb.nonNullable.control('', [VALIDATORS.email, Validators.required]),
  })
  get email() {
    return this.form.controls.email;
  }
  get ERoutes() { return ERoutes }


  submit(){
    this.authStoreService.forgotPassword(this.form.value as IForgotPassword)
  }
}
