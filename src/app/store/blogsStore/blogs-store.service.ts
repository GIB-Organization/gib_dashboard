import { DestroyRef, Injectable, inject } from '@angular/core';
import { BlogsStore } from './blogs-store.store';
import { BlogsApiService } from '../../services/api/blogsApi/blogs-api.service';
import { IBlog, IErrorResponse, IFilter } from '../../models';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { ToasterService } from '../../services/toaster/toaster.service';
import { Export } from '../../core/classes/Export';
import { helpers } from '../../core/utils/helpers';

@Injectable({
  providedIn: 'root'
})
export class BlogsStoreService {
  private api = inject(BlogsApiService);
  private store = inject(BlogsStore);
  private toaster = inject(ToasterService);

  getBlogs(data: IFilter, ref: DestroyRef) {
    this.store.setLoading(true)
    this.api.getBlogs(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ records: res.result.data, count: res.result.totalRecords });
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  getBlog(id: string, ref: DestroyRef, callback?: any) {
    this.store.setLoading(true)
    this.api.getBlog(id).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.store.update({ record: res.result });
        callback?.()
      },
      complete: () => this.store.setLoading(false),
      error: (err) => {
        this.store.setLoading(false)
      }
    });
  }
  addBlog(data: IBlog, ref: DestroyRef, callback?: any) {
    this.store.update({ isProcessing: true })
    const DATA = helpers.objToFormData(data) as IBlog;
    this.api.addBlog(DATA).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.toaster.addSuccess()
        callback?.()
      },
      complete: () => this.store.update({ isProcessing: false }),
      error: (err) => {
        this.toaster.addError(err.error.message)
        this.store.update({ isProcessing: false })
      }
    });
  }
  updateBlog(data: IBlog, ref: DestroyRef, callback?: any) {
    this.store.update({ isProcessing: true });
    const DATA = helpers.objToFormData(data) as IBlog;
    this.api.updateBlog(DATA).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.toaster.addSuccess()
        callback?.()
      },
      complete: () => this.store.update({ isProcessing: false }),
      error: (err:IErrorResponse) => {
        this.toaster.addError(err.error.message)
        this.store.update({ isProcessing: false })
      }
    });
  }
  deleteBlog(id: string, index: number, ref: DestroyRef) {
    this.store.setLoading(true)
    return this.api.deleteBlog(id).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        this.toaster.addSuccess()
        this.store.update({
          isProcessing: false,
          records: helpers.deleteItemInList(this.store.getValue().records, index)
        })
      },
      complete: () => { this.store.setLoading(false) },
      error: (err: IErrorResponse) => {
        this.toaster.addError(err.error.message)
        this.store.setLoading(false)
      }
    })
  }

  exportBlogs(data: IFilter, ref: DestroyRef) {
    this.store.update({ isExporting: true });
    this.api.exportBlogs(data).pipe(takeUntilDestroyed(ref)).subscribe({
      next: (res) => {
        const EXPORT = new Export();
        EXPORT.fileDownload(res.result, 'blogs');
        this.toaster.addSuccess()
      },
      complete: () => this.store.update({ isExporting: false }),
      error: (err: IErrorResponse) => {
        this.toaster.addError(err.error.message)
        this.store.update({ isExporting: false })
      }
    });
  }
}
