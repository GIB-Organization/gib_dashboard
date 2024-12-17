import { ChangeDetectionStrategy, Component, contentChild, EventEmitter, inject, input, model, Output, signal, TemplateRef } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { TableModule } from 'primeng/table';
import { InputGroupModule } from 'primeng/inputgroup';
import { EActionQueryParamKey, EShowTableActions } from '../../../core/enums';
import { NgTemplateOutlet } from '@angular/common';
import { BaseButtonComponentComponent } from '../../base-components/base-button-component/base-button-component.component';
import { ButtonModule } from 'primeng/button';
import { PaginatorModule, PaginatorState } from 'primeng/paginator';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService } from 'primeng/api';
import { Filter } from '../../../core/classes/Filter';
import { IItemAction } from '../../../models';
import { BaseLinkComponentComponent } from "../../base-components/base-link-component/base-link-component.component";
import { helpers } from '../../../core/utils/helpers';

@Component({
  selector: 'app-show-table',
  standalone: true,
  imports: [TableModule, TranslateModule, NgTemplateOutlet, BaseButtonComponentComponent, InputGroupModule, ButtonModule, PaginatorModule, ConfirmDialogModule, BaseLinkComponentComponent],
  providers: [ConfirmationService],
  templateUrl: './show-table.component.html',
  styleUrl: './show-table.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ShowTableComponent {
  @Output() onDelete = new EventEmitter<IItemAction>()
  @Output() onExport = new EventEmitter<any>()
  @Output() onImport = new EventEmitter<any>()
  itemsTemplate = contentChild.required<TemplateRef<any>>('itemsTemplate')
  columns = input.required<string[]>();
  rows = input.required<any[]>();
  totalRecords = input<number>(0);
  isLoading = input<boolean>(false);
  isExporting = input<boolean>(false);
  showExport = input<boolean>(true);
  showImport = input<boolean>(true);
  route = input<string>('');
  actions = input<EShowTableActions[]>([]);
  confirmationService = inject(ConfirmationService);
  selectedItem = signal<any>(null);
  selectedItemIndex = signal<number>(0);
  filter = model(new Filter());
  searchText:string = '';
  get EShowTableActions() { return EShowTableActions };
  get EActionQueryParamKey() { return EActionQueryParamKey };


  pageChanged(event: PaginatorState) {
    this.filter.update((state) => (
      {
        ...state,
        limit: Number(event.rows),
        page: Number(event.page) + 1
      }
    ));
  }

  confirmDelete(item: any, index:number) {
    this.selectedItem.set(item)
    this.confirmationService.confirm({
      message: 'areUSure',
      header: 'confirm',
      rejectButtonStyleClass: "btn btn-secondary",
      acceptButtonStyleClass: "btn btn-danger ms-2",
      accept: () => {
        this.onDelete.emit({item,index})
      },
      reject: () => {
      }
    });
  }

  export(){this.onExport.emit()}
  import(){this.onImport.emit()}

  onSearch(){
    this.filter.update(state=>({
      ...state,
      searchText: this.searchText
    }))
  }

  routeQueryParam(id:string, action:EShowTableActions){
    return helpers.routeQueryParam(id,action);
  }
}
