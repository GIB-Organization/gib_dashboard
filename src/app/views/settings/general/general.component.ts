import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { BaseLabelComponentComponent } from "../../../components/base-components/base-label-component/base-label-component.component";
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from "../../../components/base-components/base-button-component/base-button-component.component";
import { SettingsStoreService } from '../../../store/settingsStore/settings-store.service';
import { SettingsStoreQuery } from '../../../store/settingsStore/settings-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { IGeneralSettings, IGeneralSettingsFormGroup } from '../../../models';
import { InputSwitchModule } from 'primeng/inputswitch';
import { LoadingContentComponentComponent } from "../../../components/shared-components/loading-content-component/loading-content-component.component";

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [BaseLabelComponentComponent, TranslateModule, BaseButtonComponentComponent, ReactiveFormsModule, InputSwitchModule, LoadingContentComponentComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralComponent implements OnInit{
  ref = inject(DestroyRef)
  settingsStoreService = inject(SettingsStoreService);
  settingsStoreQuery = inject(SettingsStoreQuery);
  settings = toSignal(this.settingsStoreQuery.generalSettings$);
  isProcessing = toSignal(this.settingsStoreQuery.isProcessing$);
  isLoading = toSignal(this.settingsStoreQuery.selectLoading());
  #fb = inject(FormBuilder)

  form = this.#fb.group<IGeneralSettingsFormGroup>({
    siteTitleAr: this.#fb.control(''),
    siteTitleEn: this.#fb.control(''),
    siteDescriptionAr: this.#fb.control(''),
    siteDescriptionEn: this.#fb.control(''),
    address: this.#fb.control(''),
    instagram: this.#fb.control(''),
    facebook: this.#fb.control(''),
    youtube: this.#fb.control(''),
    x: this.#fb.control(''),
    phone: this.#fb.control(''),
    email: this.#fb.control(''),
    showMedicalFaults: this.#fb.control(true),
    showMedicalInsurance: this.#fb.control(true),
    showCarInsurance: this.#fb.control(true)
  })

  ngOnInit(): void {
    this.settingsStoreService.getGeneralSettings(this.ref, ()=> this.form.patchValue(this.settings() as IGeneralSettings))
  }
  submit(){
    this.settingsStoreService.updateGeneralSettings(this.form.value as IGeneralSettings, this.ref, ()=> this.form.markAsUntouched());
  }
}
