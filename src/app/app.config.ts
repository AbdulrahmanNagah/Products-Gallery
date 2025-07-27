import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withInMemoryScrolling, withViewTransitions } from '@angular/router';

import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';
import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimations } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';
import { errorsInterceptor } from './core/interceptors/errors.interceptor';
import { loadingInterceptor } from './core/interceptors/loading.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes, withViewTransitions(), 
    withInMemoryScrolling({scrollPositionRestoration: "top"})
  ),
     provideClientHydration(),
     provideHttpClient(withFetch(), withInterceptors([loadingInterceptor, errorsInterceptor])),
     provideToastr(),
     provideAnimations(),
     importProvidersFrom(NgxSpinnerModule),
    ]
};
