import { EColors } from './../../core/enums/colors.enum';
import { ChangeDetectionStrategy, Component, DestroyRef, inject } from '@angular/core';
import { ShowTableComponent } from "../../components/layout-components/show-table/show-table.component";
import { DropdownModule } from 'primeng/dropdown';
import { TranslateModule } from '@ngx-translate/core';
import { EPaymentStatus, EQuotationTypeFilter, ERoutes } from '../../core/enums';
import { PoliciesFilter } from '../../core/classes/Filter';
import { toSignal } from '@angular/core/rxjs-interop';
import { PoliciesStoreService } from '../../store/policiesStore/policies-store.service';
import { PoliciesStoreQuery } from '../../store/policiesStore/policies-store.query';
import { FormsModule } from '@angular/forms';
import { helpers } from '../../core/utils/helpers';
import { IFilter } from '../../models';
import { Payments } from '../../core/classes/Payment';
import { BaseImageComponentComponent } from "../../components/base-components/base-image-component/base-image-component.component";
import { BaseBadgeComponentComponent } from "../../components/base-components/base-badge-component/base-badge-component.component";
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-policies',
  standalone: true,
  imports: [ShowTableComponent, DropdownModule, TranslateModule, FormsModule, BaseImageComponentComponent, BaseBadgeComponentComponent, CurrencyPipe],
  templateUrl: './policies.component.html',
  styleUrl: './policies.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PoliciesComponent {
  columns:string[] = ['policyNumber', 'company', 'insuranceType', 'policyOwner', 'policyValue', 'paymentStatus', 'paymentMethod', 'date'] 
  ref = inject(DestroyRef);
  policiesStoreService = inject(PoliciesStoreService);
  policiesStoreQuery = inject(PoliciesStoreQuery);
  filter:IFilter = new PoliciesFilter();
  rows = toSignal(this.policiesStoreQuery.records$, {initialValue:[]});
  isLoading = toSignal(this.policiesStoreQuery.selectLoading(), {initialValue: false});
  totalRecords = toSignal(this.policiesStoreQuery.count$, {initialValue: 0});
  isExporting = toSignal(this.policiesStoreQuery.isExporting$, {initialValue: false});
  types = helpers.numericEnumValuesArray(EQuotationTypeFilter).map((item:string)=> ({id : item, label: 'enums.EQuotationTypeFilter.' + item}));
  payments = new Payments();
  paymentStatusBadge:{ [key in EPaymentStatus | any]: {label:string, color:EColors} } = {
    [EPaymentStatus.success] : { label:'enums.EPaymentStatus.1', color: EColors.green },
    [EPaymentStatus.fail] : { label:'enums.EPaymentStatus.2', color: EColors.red },
    [EPaymentStatus.pending] : { label:'enums.EPaymentStatus.3', color: EColors.gray },
  }
  get ERoutes(){return ERoutes}
  get EColors(){return EColors}
  ngOnInit(): void {
    this.getPolicies()
  }
  getPolicies(){
    this.policiesStoreService.getPolicies({...this.filter}, this.ref)
  }
  exportPolicies(){
    this.policiesStoreService.exportPolicies({...this.filter}, this.ref)
  }
}
