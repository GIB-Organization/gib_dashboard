import { AfterViewInit, Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ToastModule } from 'primeng/toast';
import { AuthStoreService } from './store/authStore/auth-store.service';
import { LoadingSpinnerComponent } from './components/layout-components/loading-spinner/loading-spinner.component';
import { routeFadeAnimation } from './core/animations/animations.animation';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TranslateModule,ToastModule, LoadingSpinnerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  animations:[routeFadeAnimation]
})
export class AppComponent implements OnInit, AfterViewInit{
  authStoreService = inject(AuthStoreService);
  contentLoading:boolean = true;
  ngOnInit(): void {
      this.authStoreService.getUserFromLocal();
  }
  ngAfterViewInit(): void {
    setTimeout(()=>{this.contentLoading = false}, 3000)
  }
} 
