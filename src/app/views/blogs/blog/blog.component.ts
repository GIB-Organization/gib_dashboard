import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from "../../../components/base-components/base-button-component/base-button-component.component";
import { BaseLabelComponentComponent } from "../../../components/base-components/base-label-component/base-label-component.component";
import { EditorModule } from 'primeng/editor';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { BlogsStoreService } from '../../../store/blogsStore/blogs-store.service';
import { BlogsStoreQuery } from '../../../store/blogsStore/blogs-store.query';
import { ActivatedRoute, Router } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { EActionQueryParamKey, ERoutes, EShowTableActions } from '../../../core/enums';
import { IBlog, IBlogFormGroup } from '../../../models';
import { FileSelectEvent, FileUploadModule } from 'primeng/fileupload';
import { BaseImageComponentComponent } from "../../../components/base-components/base-image-component/base-image-component.component";
import { helpers } from '../../../core/utils/helpers';
import { VALIDATORS } from '../../../core/validations';
import { InputValidationAlertComponentComponent } from "../../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component";
import { LoadingContentComponentComponent } from "../../../components/shared-components/loading-content-component/loading-content-component.component";


@Component({
  selector: 'app-blog',
  standalone: true,
  imports: [TranslateModule, BaseButtonComponentComponent, BaseLabelComponentComponent, EditorModule, ReactiveFormsModule, FileUploadModule, BaseImageComponentComponent, InputValidationAlertComponentComponent, LoadingContentComponentComponent],
  templateUrl: './blog.component.html',
  styleUrl: './blog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogComponent {
  #fb = inject(FormBuilder);
  ref = inject(DestroyRef);
  blogsStoreService = inject(BlogsStoreService);
  blogsStoreQuery = inject(BlogsStoreQuery);
  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);
  isProcessing = toSignal(this.blogsStoreQuery.isProcessing$);
  isLoading = toSignal(this.blogsStoreQuery.selectLoading());
  type: EShowTableActions = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.mode] ?? EShowTableActions.create;
  id: string = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.id];
  imgUrl = signal('');
  form = this.#fb.group<IBlogFormGroup>({
    id: this.#fb.nonNullable.control(''),
    titleAr: this.#fb.nonNullable.control('', [Validators.required]),
    titleEn: this.#fb.nonNullable.control('', [Validators.required]),
    descriptionAr: this.#fb.nonNullable.control('', [Validators.required]),
    descriptionEn: this.#fb.nonNullable.control('', [Validators.required]),
    slug: this.#fb.nonNullable.control('', [VALIDATORS.noSpaces, Validators.required]),
    image: this.#fb.control(null, [Validators.required]),
    imageUrl: this.#fb.control(''),
  })
  titleMap: { [key in string]: string } = {
    [EShowTableActions.read]: 'readBlog',
    [EShowTableActions.update]: 'updateBlog',
    [EShowTableActions.create]: 'addBlog',
  }

  get getForm() { return this.form }
  get titleAr() { return this.getForm.controls.titleAr }
  get titleEn() { return this.getForm.controls.titleEn }
  get descriptionAr() { return this.getForm.controls.descriptionAr }
  get descriptionEn() { return this.getForm.controls.descriptionEn }
  get slug() { return this.getForm.controls.slug }
  get image() { return this.getForm.controls.image }
  get imageUrl() { return this.getForm.controls.imageUrl }

  get EShowTableActions() { return EShowTableActions };

  ngOnInit(): void {
    if (this.id) {
      this.blogsStoreService.getBlog(this.id, this.ref, () => {
        this.form.patchValue(this.blogsStoreQuery.record as IBlog);
        this.imgUrl.set(this.imageUrl?.value??'');
        this.imgUrl() && this.image.removeValidators([Validators.required]);
        this.image.updateValueAndValidity();
      })
    }
  }
  addBlog() {
    this.blogsStoreService.addBlog(this.form.value as IBlog, this.ref, ()=> this.router.navigate([`/${ERoutes.blogs}`]));
  }
  updateBlog() {
    this.blogsStoreService.updateBlog({ id: this.id, ...this.form.value } as IBlog, this.ref, ()=> this.router.navigate([`/${ERoutes.blogs}`]));
  }
  async setFile($event:FileSelectEvent){
    const FILE = $event.currentFiles[0];
    this.image?.setValue(FILE)
    this.imgUrl.set(await helpers.convertImageToBase64(FILE) as string);
  }

  removeImage(event?:any){
    this.image?.setValue(null);
    this.imgUrl.set(this.imageUrl?.value??'');
  }
}
