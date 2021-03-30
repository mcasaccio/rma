import { Component, OnInit } from '@angular/core';

import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public formSubmitted = false;
  public loading: boolean = false;

  public loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    remember: [false],
  });

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    document.title = 'Iniciar sesión';
  }

  ngOnInit(): void {}

  login() {
    this.formSubmitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;

    this.authService.login(this.loginForm.value).subscribe(
      () => {
        if (this.loginForm.get('remember')!.value || false) {
          localStorage.setItem('email', this.loginForm.get('email')!.value);
        } else {
          localStorage.removeItem('email');
        }
        this.loading = false;
        this.router.navigateByUrl('/');
      },
      (err) => {
        this.loading = false;
        Swal.fire('Error', 'Usuario o contraseña incorrecta', 'error');
      }
    );
  }

  invalidFormField(field: string): boolean {
    if (this.loginForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }
}
