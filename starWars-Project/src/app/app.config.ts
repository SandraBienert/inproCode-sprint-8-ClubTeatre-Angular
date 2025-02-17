import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';
import { initializeApp } from 'firebase/app';
import { provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';




const firebaseConfig = {
  apiKey: "AIzaSyBQsHsJQgT2UiqSxCE6h1vT9koTX9zTVEU",
  authDomain: "starwars-firebase-auth.firebaseapp.com",
  projectId: "starwars-firebase-auth",
  storageBucket: "starwars-firebase-auth.firebasestorage.app",
  messagingSenderId: "1041454265434",
  appId: "1:1041454265434:web:5333fdb0e7bbacf2b1d463"
};



export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => getAuth()),
]
};



