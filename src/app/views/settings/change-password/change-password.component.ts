import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { BaseLabelComponentComponent } from '../../../components/base-components/base-label-component/base-label-component.component';
import { InputValidationAlertComponentComponent } from '../../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component';
import { SettingsStoreService } from '../../../store/settingsStore/settings-store.service';
import { SettingsStoreQuery } from '../../../store/settingsStore/settings-store.query';
import { IChangePassword, IChangePasswordFormGroup } from '../../../models';
import { VALIDATORS } from '../../../core/validations';
@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [BaseButtonComponentComponent, TranslateModule, BaseLabelComponentComponent, InputValidationAlertComponentComponent, ReactiveFormsModule],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChangePasswordComponent {
  ref = inject(DestroyRef);
  settingsStoreService = inject(SettingsStoreService);
  settingsStoreQuery = inject(SettingsStoreQuery);
  isLoading = toSignal(this.settingsStoreQuery.selectLoading());
  fb = inject(FormBuilder);
  form = this.fb.nonNullable.group<IChangePasswordFormGroup>({
    oldPassword: this.fb.control(null, [Validators.required]),
    newPassword: this.fb.control(null, [VALIDATORS.password]),
    confirmPassword: this.fb.control(null, [Validators.required])
  })
  get oldPassword() {
    return this.form.controls.oldPassword;
  }
  get newPassword() {
    return this.form.controls.newPassword;
  }
  get confirmPassword() {
    return this.form.controls.confirmPassword;
  }

  get formIsValid() {
    return this.form.valid && this.newPassword.value === this.confirmPassword.value
  }

  submit() {
    this.formIsValid && this.settingsStoreService.changePassword(this.form.value as IChangePassword, this.ref)
  }
}
