import { EColors } from './../../core/enums/colors.enum';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { ERoutes, EShowTableActions, ETicketStatusFilter } from '../../core/enums';
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
import { TicketsBadges } from '../../core/classes/Tickets';

@Component({
  selector: 'app-tickets',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, FormsModule, BaseBadgeComponentComponent, StatisticCardComponent, DatePipe],
  templateUrl: './tickets.component.html',
  styleUrl: './tickets.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketsComponent implements OnInit{
  columns :string[] = ['username', 'phone', 'messageTitle', 'dateTime', 'status'] 
  actions = [EShowTableActions.read]
  ref = inject(DestroyRef);
  ticketsStoreService = inject(TicketsStoreService);
  ticketsStoreQuery = inject(TicketsStoreQuery);
  filter:IFilter = new PoliciesFilter();
  rows = toSignal(this.ticketsStoreQuery.records$, {initialValue:[]});
  isLoading = toSignal(this.ticketsStoreQuery.selectLoading(), {initialValue: false});
  totalRecords = toSignal(this.ticketsStoreQuery.count$, {initialValue: 0});
  isExporting = toSignal(this.ticketsStoreQuery.isExporting$, {initialValue: false});
  metrics = toSignal(this.ticketsStoreQuery.metrics$);
  types = helpers.numericEnumValuesArray(ETicketStatusFilter).map((item:string)=> ({id : item, label: 'enums.ETicketsStatusFilter.' + item}));
  payments = new Payments();
  ticketsBadges = new TicketsBadges();
  get ERoutes(){return ERoutes}
  get EColors(){return EColors}
  ngOnInit(): void {
    this.getTickets();
    this.ticketsStoreService.getTicketsMetrics(this.ref);
  }
  getTickets(){
    this.ticketsStoreService.getTickets({...this.filter}, this.ref)
  }
  exportTickets(){
    this.ticketsStoreService.exportTickets({...this.filter}, this.ref)
  }
}
