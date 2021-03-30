import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';


@NgModule({
    declarations: [LoginComponent, RegisterComponent],
    exports: [LoginComponent, RegisterComponent],
    imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule, HttpClientModule],
})
export class AuthModule { }
