import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { BaseLinkComponentComponent } from "../../components/base-components/base-link-component/base-link-component.component";
import { FaqsStoreService } from '../../store/faqsStore/faqs-store.service';
import { FaqsStoreQuery } from '../../store/faqsStore/faqs-store.query';
import { Filter } from '../../core/classes/Filter';
import { toSignal } from '@angular/core/rxjs-interop';
import { ERoutes, EShowTableActions } from '../../core/enums';
import { IItemAction } from '../../models';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-faqs',
  standalone: true,
  imports: [ShowTableComponent, BaseLinkComponentComponent, TranslateModule],
  templateUrl: './faqs.component.html',
  styleUrl: './faqs.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FaqsComponent {
  ref = inject(DestroyRef);
  faqsStoreService = inject(FaqsStoreService);
  faqsStoreQuery = inject(FaqsStoreQuery);
  filter = new Filter();
  columns: string[] = ['titleAr', 'titleEn']
  rows = toSignal(this.faqsStoreQuery.faqs$, { initialValue: [] });
  isLoading = toSignal(this.faqsStoreQuery.selectLoading(), { initialValue: false });
  totalRecords = toSignal(this.faqsStoreQuery.faqsCount$, { initialValue: 0 });
  actions = [EShowTableActions.delete, EShowTableActions.update]

  get ERoutes() { return ERoutes }
  ngOnInit(): void {
    this.getFaqs()
  }

  deleteItem(event: IItemAction) {
    this.faqsStoreService.deleteFaq(event.item.id, event.index, this.ref);
  }

  getFaqs() {
    this.faqsStoreService.getFaqs({ ...this.filter }, this.ref)
  }
}
