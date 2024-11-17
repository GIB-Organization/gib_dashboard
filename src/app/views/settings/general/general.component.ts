import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseLabelComponentComponent } from "../../../components/base-components/base-label-component/base-label-component.component";
import { TranslateModule } from '@ngx-translate/core';
import { BaseButtonComponentComponent } from "../../../components/base-components/base-button-component/base-button-component.component";

@Component({
  selector: 'app-general',
  standalone: true,
  imports: [BaseLabelComponentComponent, TranslateModule, BaseButtonComponentComponent],
  templateUrl: './general.component.html',
  styleUrl: './general.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeneralComponent {

}
