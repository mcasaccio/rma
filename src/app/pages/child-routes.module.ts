import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateComponent } from './orders/create/create.component';
import { SearchComponent } from './orders/search/search.component';
import { ViewComponent } from './orders/view/view.component';
import { ProfileComponent } from './profile/profile.component';
import { SearchClientsComponent } from './clients/search/search-clients.component';
import { ViewClientComponent } from './clients/view/view-client.component';

const childRoutes: Routes = [
  { path: '', component: DashboardComponent },
  { path: 'search', component: SearchComponent, data: { titulo: 'Aca el titulo' }},
  { path: 'create', component: CreateComponent, data: { titulo: 'Aca el titulo' }},
  { path: 'view/:id', component: ViewComponent, data: { titulo: 'Aca el titulo' }},
  { path: 'profile', component: ProfileComponent, data: { titulo: 'Aca el titulo' }},
  { path: 'clients', component: SearchClientsComponent, data: { titulo: 'Aca el titulo' }},
  { path: 'clients/view/:id', component: ViewClientComponent, data: { titulo: 'Aca el titulo' }},

//   // Rutas de Admin
//   { path: 'usuarios', canActivate: [ AdminGuard ], component: UsuariosComponent, data: { titulo: 'Matenimiento de Usuarios' }},
]

@NgModule({
  imports: [ RouterModule.forChild(childRoutes) ],
  exports: [ RouterModule ]
})
export class ChildRoutesModule { }
