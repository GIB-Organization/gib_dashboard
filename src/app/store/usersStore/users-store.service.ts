import { Router } from '@angular/router';
import { DestroyRef, Injectable, inject } from '@angular/core';
import { UsersStore } from './users-store.store';
import { UsersApiService } from '../../services/api/usersApi/users-api.service';
import { IErrorResponse, IFilter, IUser } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster/toaster.service';
import { Export } from '../../core/classes/Export';
import { ERoutes } from '../../core/enums';

@Injectable({
  providedIn: 'root'
})
export class UsersStoreService {
  private api = inject(UsersApiService);
  private store = inject(UsersStore);
  private toaster = inject(ToasterService);
  private router = inject(Router);
  
  getUsers(data: IFilter, ref:DestroyRef) {
    this.store.setLoading(true)
    this.api.getUsers(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ users: res.result.data, usersCount: res.result.totalRecords });
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toaster.addError()
        this.store.setLoading(false)
      }
    });
  }
  getUser(id: string, ref:DestroyRef, callback?:any) {
    this.store.setLoading(true)
    this.api.getUser(id).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ user: res.result});
        callback()
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.toaster.addError()
        this.store.setLoading(false)
      }
    });
  }
  addUser(data: IUser, ref:DestroyRef) {
    this.store.update({isProcessing: true})
    this.api.addUser(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.toaster.addSuccess()
        this.router.navigate([`/${ERoutes.users}`]);
      },
      complete: () => this.store.update({isProcessing: false}),
      error: (err:IErrorResponse) => {
        this.toaster.addError(err.error.message)
        this.store.update({isProcessing: false})
      }
    });
  }
  updateUser(data:IUser, ref:DestroyRef){
    this.store.update({isProcessing: true})
    return this.api.updateUser(data).pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
          this.toaster.addSuccess()
          this.router.navigate([`/${ERoutes.users}`]);
        },
        complete:()=>{this.store.update({isProcessing: false})},
        error:(err:IErrorResponse)=>{
          this.toaster.addError(err.error.message)
          this.store.update({isProcessing: false})
        }
    })
  }
  deleteUser(id:string, index:number, ref:DestroyRef){
    this.store.setLoading(true)
    return this.api.deleteUser(id).pipe(takeUntilDestroyed(ref)).subscribe({
        next:(res)=>{
          this.toaster.addSuccess()
          const USERS = [...this.store.getValue().users];
          USERS.splice(index, 1);
          this.store.update({
            isProcessing: false,
            users: USERS
          })
        },
        complete:()=>{this.store.setLoading(false)},
        error:(err:IErrorResponse)=>{
          this.toaster.addError(err.error.message)
          this.store.setLoading(false)
        }
    })
  }

  exportUsers(data: IFilter, ref:DestroyRef) {
    this.store.update({isExporting: true});
    this.api.exportUsers(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        const EXPORT = new Export();
        EXPORT.fileDownload(res.result, 'users');
        this.toaster.addSuccess()
      },
      complete: () => this.store.update({isExporting: false}),
      error: (err:IErrorResponse) => {
        this.toaster.addError(err.error.message)
        this.store.update({isExporting: false})
      }
    });
  }
}
