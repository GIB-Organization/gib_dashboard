import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BaseImageComponentComponent } from '../base-image-component/base-image-component.component';
import { BaseLinkComponentComponent } from '../base-link-component/base-link-component.component';

@Component({
  selector: 'app-base-logo-component',
  standalone: true,
  imports: [BaseImageComponentComponent, BaseLinkComponentComponent],
  templateUrl: './base-logo-component.component.html',
  styleUrl: './base-logo-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLogoComponentComponent {

}
