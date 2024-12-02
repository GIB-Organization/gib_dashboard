import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-client-data',
  standalone: true,
  imports: [],
  templateUrl: './client-data.component.html',
  styleUrl: './client-data.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ClientDataComponent {

}
