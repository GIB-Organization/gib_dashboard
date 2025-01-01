import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';
import { IFaq, IFaqFormGroup } from '../../../models';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { BaseLabelComponentComponent } from '../../../components/base-components/base-label-component/base-label-component.component';
import { EActionQueryParamKey, EShowTableActions } from '../../../core/enums';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingContentComponentComponent } from "../../../components/shared-components/loading-content-component/loading-content-component.component";
import { InputValidationAlertComponentComponent } from "../../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component";
import { FaqsStoreService } from '../../../store/faqsStore/faqs-store.service';
import { FaqsStoreQuery } from '../../../store/faqsStore/faqs-store.query';

@Component({
  selector: 'app-faq',
  standalone: true,
  imports: [ReactiveFormsModule, BaseButtonComponentComponent, BaseLabelComponentComponent, PasswordModule, TranslateModule, LoadingContentComponentComponent, InputValidationAlertComponentComponent],
  templateUrl: './faq.component.html',
  styleUrl: './faq.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqComponent implements OnInit{
  #fb = inject(FormBuilder);
  ref = inject(DestroyRef);
  faqsStoreService = inject(FaqsStoreService);
  faqsStoreQuery = inject(FaqsStoreQuery);
  activatedRoute = inject(ActivatedRoute);
  isProcessing = toSignal(this.faqsStoreQuery.isProcessing$);
  isLoading = toSignal(this.faqsStoreQuery.selectLoading());
  type:EShowTableActions = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.mode]??EShowTableActions.create;
  id:string = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.id];
  form= this.#fb.group<IFaqFormGroup>({
    titleAr: this.#fb.nonNullable.control('', [Validators.required]),
    titleEn: this.#fb.nonNullable.control('', [Validators.required]),
    descriptionAr: this.#fb.nonNullable.control('', [Validators.required]),
    descriptionEn: this.#fb.nonNullable.control('', [Validators.required]),
  })

  titleMap:{[key : string]: string}={
    [EShowTableActions.read]: 'readFaq',
    [EShowTableActions.update]: 'updateFaq',
    [EShowTableActions.create]: 'addFaq',
  }

  get getForm(){return this.form}
  get titleAr(){return this.getForm.controls.titleAr}
  get titleEn(){return this.getForm.controls.titleEn}
  get descriptionAr(){return this.getForm.controls.descriptionAr}
  get descriptionEn(){return this.getForm.controls.descriptionEn}

  get EShowTableActions(){return EShowTableActions};

  ngOnInit(): void {
    if(this.id) {
      this.faqsStoreService.getFaq(this.id, this.ref, () => this.form.patchValue(this.faqsStoreQuery.faq as IFaq))
    }
  }
  addFaq(){
    this.faqsStoreService.addFaq(this.form.value as IFaq, this.ref);
  }
  updateFaq(){
    this.faqsStoreService.updateFaq({id:this.id, ...this.form.value} as IFaq, this.ref);
  }
}
