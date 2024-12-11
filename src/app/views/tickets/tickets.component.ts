import { EColors } from './../../core/enums/colors.enum';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { EPaymentStatus, ERoutes, EShowTableActions, ETicketStatus, ETicketStatusFilter } from '../../core/enums';
import { PoliciesFilter } from '../../core/classes/Filter';
import { toSignal } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { helpers } from '../../core/utils/helpers';
import { IFilter } from '../../models';
import { Payments } from '../../core/classes/Payment';
import { BaseBadgeComponentComponent } from "../../components/base-components/base-badge-component/base-badge-component.component";
import { StatisticCardComponent } from "../../components/views-components/statistics/statistic-card/statistic-card.component";
import { TicketsStoreService } from '../../store/ticketsStore/tickets-store.service';
import { TicketsStoreQuery } from '../../store/ticketsStore/tickets-store.query';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, FormsModule, BaseBadgeComponentComponent, StatisticCardComponent, DatePipe],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent {
  columns :string[] = ['username', 'messageTitle', 'dateTime', 'status'] 
  actions = [EShowTableActions.read]
  ref = inject(DestroyRef);
  ticketsStoreService = inject(TicketsStoreService);
  ticketsStoreQuery = inject(TicketsStoreQuery);
  filter:IFilter = new PoliciesFilter();
  rows = toSignal(this.ticketsStoreQuery.records$, {initialValue:[]});
  isLoading = toSignal(this.ticketsStoreQuery.selectLoading(), {initialValue: false});
  totalRecords = toSignal(this.ticketsStoreQuery.count$, {initialValue: 0});
  isExporting = toSignal(this.ticketsStoreQuery.isExporting$, {initialValue: false});
  types = helpers.numericEnumValuesArray(ETicketStatusFilter).map((item:string)=> ({id : item, label: 'enums.ETicketsStatusFilter.' + item}));
  payments = new Payments();
  ticketStatusBadge:{ [key in EPaymentStatus | any]: {label:string, color:EColors} } = {
    [ETicketStatus.open] : { label:'enums.ETicketsStatusFilter.1', color: EColors.orange },
    [ETicketStatus.close] : { label:'enums.ETicketsStatusFilter.2', color: EColors.blue },
  }
  get ERoutes(){return ERoutes}
  get EColors(){return EColors}
  ngOnInit(): void {
    this.getPolicies()
  }
  getPolicies(){
    this.ticketsStoreService.getTickets({...this.filter}, this.ref)
  }
  exportPolicies(){
    this.ticketsStoreService.exportTickets({...this.filter}, this.ref)
  }
}
