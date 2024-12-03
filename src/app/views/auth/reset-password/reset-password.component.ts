import { ERoutes } from './../../../core/enums/routes.enum';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BaseLogoComponentComponent } from "../../../components/base-components/base-logo-component/base-logo-component.component";
import { BaseLabelComponentComponent } from "../../../components/base-components/base-label-component/base-label-component.component";
import { PasswordModule } from 'primeng/password';
import { InputOtpModule } from 'primeng/inputotp';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from "../../../components/base-components/base-button-component/base-button-component.component";
import { BaseLinkComponentComponent } from "../../../components/base-components/base-link-component/base-link-component.component";
import { IResetPassword, IResetPasswordFormGroup } from '../../../models';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { VALIDATORS } from '../../../core/validations';
import { InputValidationAlertComponentComponent } from "../../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component";
import { AuthStoreService } from '../../../store/authStore/auth-store.service';
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [BaseLogoComponentComponent, BaseLabelComponentComponent, PasswordModule, TranslateModule, BaseButtonComponentComponent, BaseLinkComponentComponent, InputValidationAlertComponentComponent, ReactiveFormsModule, InputOtpModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ResetPasswordComponent {

  #fb = inject(FormBuilder);
  authStoreService = inject(AuthStoreService);
  authStoreQuery = inject(AuthStoreQuery);
  isLoading = toSignal(this.authStoreQuery.selectLoading());
  form = this.#fb.group<IResetPasswordFormGroup>({
    code: this.#fb.control(null, [Validators.minLength(4), Validators.required]),
    newPassword: this.#fb.nonNullable.control('', [Validators.required, VALIDATORS.password]),
    confirmPassword: this.#fb.nonNullable.control('', [Validators.required, VALIDATORS.password]),
  })
  get code() {
    return this.form.controls.code;
  }
  get newPassword() {
    return this.form.controls.newPassword;
  }
  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }
  get ERoutes() { return ERoutes }


  submit(){
    this.authStoreService.resetPassword(this.form.value as IResetPassword)
  }
}
