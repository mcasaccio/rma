import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthRoutingModule } from './auth/auth.routing';
import { PagesRoutingModule } from './pages/pages.routing';


import { Page404Component } from './page404/page404.component';

const routes: Routes = [
    { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
    { path: '**', component: Page404Component },
];

@NgModule({
    imports: [
      RouterModule.forRoot( routes ),
      PagesRoutingModule,
      AuthRoutingModule
    ],
    exports: [ RouterModule ]
  })
  export class AppRoutingModule { }
  
