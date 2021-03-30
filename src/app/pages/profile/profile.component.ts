import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

// services
import { AuthService } from '../../services/auth.service';
import { ProfileService } from '../../services/profile.service';

// models
import { User } from '../../models/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  public formSubmitted = false;
  public loading: boolean = false;
  public user!: User;
  public perfilForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private profileService: ProfileService
  ) {}

  ngOnInit(): void {
    this.user = this.authService.user;
    this.perfilForm = this.formBuilder.group({
      name: [this.user.name, Validators.required],
      email: [this.user.email, [Validators.required, Validators.email]],
    });
  }

  invalidFormField(field: string): boolean {
    if (this.perfilForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  updateProfile() {
    this.formSubmitted = true;
    if (this.perfilForm.invalid) {
      return;
    }
    this.loading = true;
    this.profileService.updateProfile(this.perfilForm.value).subscribe(
      () => {
        const { name, email } = this.perfilForm.value;
        this.user.name = name;
        this.user.email = email;
        this.loading = false;
        Swal.fire('Mi perfil', 'Cambios realizados correctamente', 'success');
      },
      (err) => {
        this.loading = false;
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
