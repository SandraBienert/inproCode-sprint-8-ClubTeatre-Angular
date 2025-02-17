import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { StarshipDetailComponent } from './components/starship-detail/starship-detail.component';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { WelcomeComponent } from './components/welcome/welcome.component';
import { authGuard } from './guards/auth.guard';
import { StarshipsListComponent } from './components/starships-list/starships-list.component';
import { Component } from '@angular/core';


export const routes: Routes = [
  {
    path: '',
    redirectTo: 'welcome',
    pathMatch: 'full'
  },
  {
    path: 'welcome',
    component: WelcomeComponent
  },

{
  path: 'login',
  loadComponent: () => import('./auth/login/login.component')
  .then(m => m.LoginComponent),
},
{
  path: 'register',
  loadComponent: () => import('./auth/register/register.component')
    .then(m => m.RegisterComponent),
},
{
  path: 'home',
    loadComponent: () => import('./components/home/home.component')
    .then(m => m.HomeComponent)
},

{
  path: 'home/starship/:id',
  component: StarshipDetailComponent
},
{
    path: '**',
    redirectTo: 'welcome',
}
];
