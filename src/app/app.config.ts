import { refreshTokenInterceptor } from './core/interceptors/refreshToken/refresh-token.interceptor';
import { environment } from '../environments/environment';
import { ApplicationConfig, DEFAULT_CURRENCY_CODE, importProvidersFrom } from '@angular/core';
import { InMemoryScrollingOptions, provideRouter, withComponentInputBinding, withInMemoryScrolling } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { HttpClientModule, provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { translateModuleImport } from './core/config/translate.config';
import { provideAnimations } from '@angular/platform-browser/animations';
import { authInterceptor } from './core/interceptors/auth/auth.interceptor';
import { BASE_URL_TOKEN, SITE_BASE_URL_TOKEN } from './core/injection-tokens/base-url.token';
import { MessageService } from 'primeng/api';
import { errorHandlerInterceptor } from './core/interceptors/errorHandler/error-handler.interceptor';
import { DATE_PIPE_DEFAULT_OPTIONS } from '@angular/common';

const scrollConfig: InMemoryScrollingOptions = {
  scrollPositionRestoration: 'top',
  anchorScrolling: 'enabled',
};

export const appConfig: ApplicationConfig = {
  providers: [
    MessageService,
    importProvidersFrom([
      HttpClientModule, 
      translateModuleImport()
    ]),
    {provide: DATE_PIPE_DEFAULT_OPTIONS, useValue: {dateFormat: 'medium'}},
    {provide: BASE_URL_TOKEN, useValue: environment.apiUrl,},
    {provide: SITE_BASE_URL_TOKEN, useValue: environment.siteApiUrl},
    {provide: DEFAULT_CURRENCY_CODE, useValue: ' SAR ' },
    provideRouter(routes, withInMemoryScrolling(scrollConfig), withComponentInputBinding()), 
    provideClientHydration(),
    provideAnimations(),
    provideHttpClient(
      withFetch(),
      withInterceptors([
        authInterceptor, 
        errorHandlerInterceptor,
        refreshTokenInterceptor, 
      ]), 
    ),
  ]
};
