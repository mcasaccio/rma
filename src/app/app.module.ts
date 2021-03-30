import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AuthModule } from './auth/auth.module'
import { PagesModule } from './pages/pages.module';
import { Page404Component } from './page404/page404.component';

@NgModule({
    declarations: [
        AppComponent,
        Page404Component
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        AuthModule,
        PagesModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
