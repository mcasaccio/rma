import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

// Modules
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';

// Components
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SearchComponent } from './orders/search/search.component';
import { CreateComponent } from './orders/create/create.component';
import { ProfileComponent } from './profile/profile.component';
import { ViewComponent } from './orders/view/view.component';
import { SearchClientsComponent } from './clients/search/search-clients.component';
import { ViewClientComponent } from './clients/view/view-client.component';





@NgModule({
    declarations: [PagesComponent, DashboardComponent, SearchComponent, CreateComponent, ProfileComponent, ViewComponent, SearchClientsComponent, ViewClientComponent],
    exports: [PagesComponent],
    imports: [
        CommonModule,
        RouterModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
    ]
})
export class PagesModule { }
