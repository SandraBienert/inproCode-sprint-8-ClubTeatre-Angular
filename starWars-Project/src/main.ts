import { RouterModule } from '@angular/router';
import { importProvidersFrom } from '@angular/core';
import { provideFirebaseApp } from '@angular/fire/app';
import { provideAuth } from '@angular/fire/auth';
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { environment } from './environments/environment';
import { routes } from './app/app.routes';
import { provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { firebaseConfig } from './environments/firebase-config';


initializeApp(firebaseConfig);

bootstrapApplication(AppComponent, {
  ...appConfig,
  providers: [
    importProvidersFrom(RouterModule.forRoot(routes)),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(environment.firebaseConfig)),
    provideAuth(() => getAuth()),
    provideNoopAnimations(),
  ],
})
.catch((err) => console.error(err));
