import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BaseLabelComponentComponent } from "../../../components/base-components/base-label-component/base-label-component.component";
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from "../../../components/base-components/base-button-component/base-button-component.component";
import { SettingsStoreService } from '../../../store/settingsStore/settings-store.service';
import { SettingsStoreQuery } from '../../../store/settingsStore/settings-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { ISeoSettings, ISeoSettingsFormGroup } from '../../../models';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LoadingContentComponentComponent } from "../../../components/shared-components/loading-content-component/loading-content-component.component";

@Component({
  selector: 'app-seo',
  standalone: true,
  imports: [BaseLabelComponentComponent, TranslateModule, BaseButtonComponentComponent, ReactiveFormsModule, InputSwitchModule, LoadingContentComponentComponent],
  templateUrl: './seo.component.html',
  styleUrl: './seo.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SeoComponent {
  ref = inject(DestroyRef)
  settingsStoreService = inject(SettingsStoreService);
  settingsStoreQuery = inject(SettingsStoreQuery);
  settings = toSignal(this.settingsStoreQuery.seoSettings$);
  isProcessing = toSignal(this.settingsStoreQuery.isProcessing$);
  isLoading = toSignal(this.settingsStoreQuery.selectLoading());
  #fb = inject(FormBuilder)

  form = this.#fb.group<ISeoSettingsFormGroup>({
    homeTitle: this.#fb.control(''),
    homeDescription: this.#fb.control(''),
    contactTitle: this.#fb.control(''),
    contactDescription: this.#fb.control(''),
    aboutTitle: this.#fb.control(''),
    aboutDescription: this.#fb.control(''),
    blogsTitle: this.#fb.control(''),
    blogsDescription: this.#fb.control(''),
    privacyPolicyTitle: this.#fb.control(''),
    privacyPolicyDescription: this.#fb.control(''),
    termsTitle: this.#fb.control(''),
    termsDescription: this.#fb.control('')
  })

  ngOnInit(): void {
    this.settingsStoreService.getSeoSettings(this.ref, () => this.form.patchValue(this.settings() as ISeoSettings))
  }
  submit() {
    this.settingsStoreService.updateSeoSettings(this.form.value as ISeoSettings, this.ref, () => this.form.markAsUntouched());
  }
}
