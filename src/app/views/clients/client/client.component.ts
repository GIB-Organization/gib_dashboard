import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { EActionQueryParamKey, EShowTableActions } from '../../../core/enums';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';
import { LoadingContentComponentComponent } from "../../../components/shared-components/loading-content-component/loading-content-component.component";
import { ClientsStoreService } from '../../../store/clientsStore/clients-store.service';
import { ClientsStoreQuery } from '../../../store/clientsStore/clients-store.query';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [TranslateModule, LoadingContentComponentComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientComponent implements OnInit{
  ref = inject(DestroyRef);
  clientsStoreService = inject(ClientsStoreService);
  clientsStoreQuery = inject(ClientsStoreQuery);
  activatedRoute = inject(ActivatedRoute);
  isProcessing = toSignal(this.clientsStoreQuery.isProcessing$);
  isLoading = toSignal(this.clientsStoreQuery.selectLoading());
  type:EShowTableActions = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.mode]??EShowTableActions.create;
  id:string = this.activatedRoute.snapshot.queryParams[EActionQueryParamKey.id];

  ngOnInit(): void {
    if(this.id) {
      this.clientsStoreService.getClient(this.id, this.ref)
    }
  }
}
