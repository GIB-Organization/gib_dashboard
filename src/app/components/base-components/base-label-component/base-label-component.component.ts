import { ChangeDetectionStrategy, Component, Input, TemplateRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-base-label-component',
  standalone: true,
  imports: [],
  templateUrl: './base-label-component.component.html',
  styleUrl: './base-label-component.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BaseLabelComponentComponent{
  @ViewChild('tooltipContent') ref!:TemplateRef<any>;
  @Input() classes!:string;
  @Input() for!:string;
  @Input() required:boolean = false;
  @Input() isPopover:boolean = false;
  @Input() popoverContent!:string;
}
