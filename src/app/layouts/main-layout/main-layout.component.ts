import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { slideInOutAnimation } from '../../core/animations/animations.animation';
import { AnimationsContext } from '../../core/animations/animations.class';
import { DashboardSidebarComponent } from '../../components/layout-components/dashboard-sidebar/dashboard-sidebar.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    RouterOutlet,
    DashboardSidebarComponent
  ],
  animations:[slideInOutAnimation],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MainLayoutComponent extends AnimationsContext{
  
}
