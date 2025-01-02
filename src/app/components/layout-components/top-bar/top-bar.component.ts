import { TranslateModule } from '@ngx-translate/core';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { AuthStoreService } from '../../../store/authStore/auth-store.service';
import { BaseButtonComponentComponent } from "../../base-components/base-button-component/base-button-component.component";
import { AuthStoreQuery } from '../../../store/authStore/auth-store.query';
import { Location } from '@angular/common';

@Component({
  selector: 'app-top-bar',
  standalone: true,
  imports: [TranslateModule, BaseButtonComponentComponent],
  templateUrl: './top-bar.component.html',
  styleUrl: './top-bar.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TopBarComponent {
  authStoreQuery = inject(AuthStoreQuery)
  authStoreService = inject(AuthStoreService);
  location = inject(Location);
}
