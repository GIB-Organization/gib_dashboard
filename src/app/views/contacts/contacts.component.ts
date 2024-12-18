import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { ERoutes, EShowTableActions } from '../../core/enums';
import { Filter } from '../../core/classes/Filter';
import { toSignal } from '@angular/core/rxjs-interop';
import { IItemAction } from '../../models';
import { ContactsStoreService } from '../../store/contactsStore/contacts-store.service';
import { ContactsStoreQuery } from '../../store/contactsStore/contacts-store.query';

@Component({
  selector: 'app-contacts',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, ButtonModule],
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ContactsComponent {
  columns :string[] = ['name', 'email', 'phone', 'subject', 'message'] 
  ref = inject(DestroyRef);
  contactsStoreService = inject(ContactsStoreService);
  clientsStoreQuery = inject(ContactsStoreQuery);
  filter = new Filter();
  rows = toSignal(this.clientsStoreQuery.records$, {initialValue:[]});
  isLoading = toSignal(this.clientsStoreQuery.selectLoading(), {initialValue: false});
  totalRecords = toSignal(this.clientsStoreQuery.count$, {initialValue: 0});
  isExporting = toSignal(this.clientsStoreQuery.isExporting$, {initialValue: false});
  actions = [EShowTableActions.delete]

  get ERoutes(){return ERoutes}
  ngOnInit(): void {
    this.getContacts()
  }

  deleteItem(event:IItemAction){
    this.contactsStoreService.deleteContact(event.item.id, event.index, this.ref);
  }

  getContacts(){
    this.contactsStoreService.getContacts({...this.filter}, this.ref)
  }

  exportContacts(){
    this.contactsStoreService.exportContacts({...this.filter}, this.ref)
  }
}
