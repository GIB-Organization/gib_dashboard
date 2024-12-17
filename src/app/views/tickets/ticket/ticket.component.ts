import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from '../../../components/base-components/base-button-component/base-button-component.component';
import { DividerModule } from 'primeng/divider';
import { BaseBadgeComponentComponent } from "../../../components/base-components/base-badge-component/base-badge-component.component";
import { EActionQueryParamKey, EColors, EShowTableActions, ETicketStatus } from '../../../core/enums';
import { TicketsStoreService } from '../../../store/ticketsStore/tickets-store.service';
import { TicketsStoreQuery } from '../../../store/ticketsStore/tickets-store.query';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { TicketsBadges } from '../../../core/classes/Tickets';
import { LoadingContentComponentComponent } from "../../../components/shared-components/loading-content-component/loading-content-component.component";
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BaseLinkComponentComponent } from "../../../components/base-components/base-link-component/base-link-component.component";
@Component({
  selector: 'app-ticket',
  standalone: true,
  imports: [TranslateModule, BaseButtonComponentComponent, DividerModule, BaseBadgeComponentComponent, LoadingContentComponentComponent, DatePipe, FormsModule, BaseLinkComponentComponent],
  templateUrl: './ticket.component.html',
  styleUrl: './ticket.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TicketComponent {
  ref = inject(DestroyRef);
  ticketsStoreService = inject(TicketsStoreService);
  ticketsStoreQuery = inject(TicketsStoreQuery);
  authStoreQuery = inject(AuthStoreQuery);
  activatedRoute = inject(ActivatedRoute);
  isProcessing = toSignal(this.ticketsStoreQuery.isProcessing$);
  record = toSignal(this.ticketsStoreQuery.record$);
  recordStatus = toSignal(this.ticketsStoreQuery.recordStatus$, {initialValue: ETicketStatus.open});
  isLoading = toSignal(this.ticketsStoreQuery.selectLoading());
  type: EShowTableActions = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.mode] ?? EShowTableActions.create;
  id: string = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.id];
  ticketsBadges = new TicketsBadges();
  replyText = signal('');
  get ETicketStatus() { return ETicketStatus }

  ngOnInit(): void {
    if(this.id) {
      this.ticketsStoreService.getTicket(this.id, this.ref)
    }
  }

  submitReply(){
    this.ticketsStoreService.replyTicket({
      message: this.replyText(),
      id: this.id
    }, this.ref)
    this.replyText.set('');
  }
}
