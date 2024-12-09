import { UsersStoreQuery } from './../../store/usersStore/users-store.query';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ShowTableComponent } from '../../components/layout-components/show-table/show-table.component';
import { ButtonModule } from 'primeng/button';
import { ERoutes, EShowTableActions } from '../../core/enums';
import { UsersStoreService } from '../../store/usersStore/users-store.service';
import { toSignal } from '@angular/core/rxjs-interop';
import { Filter } from '../../core/classes/Filter';
import { DatePipe } from '@angular/common';
import { IItemAction } from '../../models';
import { BaseLinkComponentComponent } from "../../components/base-components/base-link-component/base-link-component.component";

@Component({
  selector: 'app-users',
  standalone: true,
  imports: [ShowTableComponent, ButtonModule, DatePipe, BaseLinkComponentComponent],
  templateUrl: './users.component.html',
  styleUrl: './users.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class UsersComponent implements OnInit {
  ref = inject(DestroyRef);
  usersStoreService = inject(UsersStoreService);
  usersStoreQuery = inject(UsersStoreQuery);
  filter = new Filter();
  columns:string[] = ['name','email','createdDate']
  rows = toSignal(this.usersStoreQuery.users$, {initialValue:[]});
  isLoading = toSignal(this.usersStoreQuery.selectLoading(), {initialValue: false});
  totalRecords = toSignal(this.usersStoreQuery.usersCount$, {initialValue: 0});
  isExporting = toSignal(this.usersStoreQuery.isExporting$, {initialValue: false});
  actions = [EShowTableActions.delete, EShowTableActions.update]

  get ERoutes(){return ERoutes}
  ngOnInit(): void {
    this.getUsers()
  }

  deleteItem(event:IItemAction){
    this.usersStoreService.deleteUser(event.item.id, event.index, this.ref);
  }

  getUsers(){
    this.usersStoreService.getUsers({...this.filter}, this.ref)
  }

  exportUsers(){
    this.usersStoreService.exportUsers({...this.filter}, this.ref)
  }
}
