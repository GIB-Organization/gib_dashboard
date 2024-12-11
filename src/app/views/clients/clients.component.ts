import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ERoutes, EShowTableActions } from '../../core/enums';
import { ClientsStoreService } from '../../store/clientsStore/clients-store.service';
import { ClientsStoreQuery } from '../../store/clientsStore/clients-store.query';
import { Filter } from '../../core/classes/Filter';
import { toSignal } from '@angular/core/rxjs-interop';
import { IItemAction } from '../../models';

@Component({
  selector: 'app-clients',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, ButtonModule],
  templateUrl: './clients.component.html',
  styleUrl: './clients.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientsComponent {
  columns :string[] = ['name', 'email', 'phone', 'nationalId'] 
  ref = inject(DestroyRef);
  clinetsStoreService = inject(ClientsStoreService);
  clientsStoreQuery = inject(ClientsStoreQuery);
  filter = new Filter();
  rows = toSignal(this.clientsStoreQuery.records$, {initialValue:[]});
  isLoading = toSignal(this.clientsStoreQuery.selectLoading(), {initialValue: false});
  totalRecords = toSignal(this.clientsStoreQuery.count$, {initialValue: 0});
  isExporting = toSignal(this.clientsStoreQuery.isExporting$, {initialValue: false});
  actions = [EShowTableActions.delete, EShowTableActions.read]

  get ERoutes(){return ERoutes}
  ngOnInit(): void {
    this.getClients()
  }

  deleteItem(event:IItemAction){
    this.clinetsStoreService.deleteClient(event.item.id, event.index, this.ref);
  }

  getClients(){
    this.clinetsStoreService.getClients({...this.filter}, this.ref)
  }

  exportClients(){
    this.clinetsStoreService.exportClients({...this.filter}, this.ref)
  }
}
