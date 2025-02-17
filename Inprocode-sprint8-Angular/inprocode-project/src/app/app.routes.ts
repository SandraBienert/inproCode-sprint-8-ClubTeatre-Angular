
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MembersListComponent } from './components/members-list/members-list.component';
import { CrudMembersComponent } from './components/crud-members/crud-members.component';
import { AppFullCalendarComponent } from './components/full-calendar/full-calendar.component';
import { GraficsComponent } from './components/grafics/grafics.component';
import { MapaComponent } from './components/mapa/mapa.component';


export const routes: Routes = [

  { path: '', component: HomeComponent }, // Ruta por defecto
  { path: 'members-list', component: MembersListComponent},
  { path: 'crud-members', component: CrudMembersComponent},
  { path: 'full-calendar', component: AppFullCalendarComponent },
  { path: 'mapa', component: MapaComponent },
  { path: 'grafics', component: GraficsComponent },
  { path: 'edit/:id', component: CrudMembersComponent},
  { path: '**', redirectTo: '', pathMatch: 'full'  } // Ruta comodín para páginas no encontradas
];
