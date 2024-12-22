import { DestroyRef, Injectable, inject } from '@angular/core';
import { SettingsStore } from './settings-store.store';
import { SettingsApiService } from '../../services/api/settingsApi/settings-api.service';
import { IChangePassword, IErrorResponse, IGeneralSettings, ISeoSettings } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster/toaster.service';

@Injectable({
  providedIn: 'root'
})
export class SettingsStoreService {
  private api = inject(SettingsApiService);
  private store = inject(SettingsStore);
  private toaster = inject(ToasterService);

  getGeneralSettings(ref: DestroyRef, callback?: any) {
    this.store.setLoading(true)
    this.api.getGeneralSettings().pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ generalSettings: res.result });
        callback?.()
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  getSeoSettings(ref: DestroyRef, callback?: any) {
    this.store.setLoading(true)
    this.api.getSeoSettings().pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ seoSettings: res.result });
        callback?.()
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  updateGeneralSettings(data: IGeneralSettings, ref: DestroyRef, callback?: any) {
    this.store.update({ isProcessing: true });
    this.api.updateGeneralSettings(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.toaster.addSuccess();
        callback?.();
      },
      complete: () => this.store.update({ isProcessing: false }),
      error: (err) => {
        this.store.update({ isProcessing: false })
      }
    });
  }
  updateSeoSettings(data: ISeoSettings, ref: DestroyRef, callback?: any) {
    this.store.update({ isProcessing: true });
    this.api.updateSeoSettings(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.toaster.addSuccess();
        callback?.();
      },
      complete: () => this.store.update({ isProcessing: false }),
      error: (err) => {
        this.store.update({ isProcessing: false })
      }
    });
  }
  changePassword(data: IChangePassword, ref: DestroyRef) {
    this.store.setLoading(true)
    this.api.changePassword(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: () => {
        this.toaster.addSuccess('donePleaseLoginAgain')
      },
      complete: () => this.store.setLoading(false),
      error: (err: IErrorResponse) => {
        this.store.setLoading(false)
        this.toaster.addError(err.error.message ?? 'customRequestErrors.wrongPassword')
      }
    });
  }
}
