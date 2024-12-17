import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { PasswordModule } from 'primeng/password';
import { TranslateModule } from '@ngx-translate/core';
import { IUser, IUserFormGroup } from '../../../models';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { BaseLabelComponentComponent } from '../../../components/base-components/base-label-component/base-label-component.component';
import { EActionQueryParamKey, EShowTableActions } from '../../../core/enums';
import { VALIDATORS } from '../../../core/validations';
import { ActivatedRoute } from '@angular/router';
import { UsersStoreService } from '../../../store/usersStore/users-store.service';
import { UsersStoreQuery } from '../../../store/usersStore/users-store.query';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingContentComponentComponent } from "../../../components/shared-components/loading-content-component/loading-content-component.component";
import { InputValidationAlertComponentComponent } from "../../../components/shared-components/input-validation-alert-component/input-validation-alert-component.component";
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [ReactiveFormsModule, BaseButtonComponentComponent, BaseLabelComponentComponent, PasswordModule, TranslateModule, LoadingContentComponentComponent, InputValidationAlertComponentComponent],
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UserComponent implements OnInit{
  #fb = inject(FormBuilder);
  ref = inject(DestroyRef);
  usersStoreService = inject(UsersStoreService);
  usersStoreQuery = inject(UsersStoreQuery);
  activatedRoute = inject(ActivatedRoute);
  isProcessing = toSignal(this.usersStoreQuery.isProcessing$);
  isLoading = toSignal(this.usersStoreQuery.selectLoading());
  type:EShowTableActions = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.mode]??EShowTableActions.create;
  id:string = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.id];
  form= this.#fb.group<IUserFormGroup>({
    email: this.#fb.control('', [VALIDATORS.email, Validators.required]),
    fullName: this.#fb.control('', [Validators.required]),
  })
  titleMap:{[key : string]: string}={
    [EShowTableActions.read]: 'readUser',
    [EShowTableActions.update]: 'updateUser',
    [EShowTableActions.create]: 'addUser',
  }

  get getForm(){return this.form}
  get email(){return this.getForm.controls.email}
  get fullName(){return this.getForm.controls.fullName}

  get EShowTableActions(){return EShowTableActions};

  ngOnInit(): void {
    if(this.id) {
      this.usersStoreService.getUser(this.id, this.ref, () => this.form.patchValue(this.usersStoreQuery.user as IUser))
    }
  }
  addUser(){
    this.usersStoreService.addUser(this.form.value as IUser, this.ref);
  }
  updateUser(){
    this.usersStoreService.updateUser({id:this.id, ...this.form.value} as IUser, this.ref);
  }
}
