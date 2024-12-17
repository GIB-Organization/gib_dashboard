import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ERoutes, EShowTableActions } from '../../core/enums';
import { BlogsStoreService } from '../../store/blogsStore/blogs-store.service';
import { BlogsStoreQuery } from '../../store/blogsStore/blogs-store.query';
import { Filter } from '../../core/classes/Filter';
import { toSignal } from '@angular/core/rxjs-interop';
import { IItemAction } from '../../models';
import { BaseImageComponentComponent } from "../../components/base-components/base-image-component/base-image-component.component";
import { DatePipe } from '@angular/common';
import { BaseLinkComponentComponent } from "../../components/base-components/base-link-component/base-link-component.component";

@Component({
  selector: 'app-blogs',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, ButtonModule, BaseImageComponentComponent, DatePipe, BaseLinkComponentComponent],
  templateUrl: './blogs.component.html',
  styleUrl: './blogs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BlogsComponent {
  columns: string[] = ['titleAr', 'titleEn', 'image', 'postDate']
  ref = inject(DestroyRef);
  blogsStoreService = inject(BlogsStoreService);
  blogsStoreQuery = inject(BlogsStoreQuery);
  filter = new Filter();
  rows = toSignal(this.blogsStoreQuery.records$, { initialValue: [] });
  isLoading = toSignal(this.blogsStoreQuery.selectLoading(), { initialValue: false });
  totalRecords = toSignal(this.blogsStoreQuery.count$, { initialValue: 0 });
  isExporting = toSignal(this.blogsStoreQuery.isExporting$, { initialValue: false });
  actions = [EShowTableActions.delete, EShowTableActions.read, EShowTableActions.update];
  get ERoutes() { return ERoutes }
  ngOnInit(): void {
    this.getBlogs()
  }

  deleteItem(event: IItemAction) {
    this.blogsStoreService.deleteBlog(event.item.id, event.index, this.ref);
  }

  getBlogs() {
    this.blogsStoreService.getBlogs({ ...this.filter }, this.ref)
  }

  exportBlogs() {
    this.blogsStoreService.exportBlogs({ ...this.filter }, this.ref)
  }

}
