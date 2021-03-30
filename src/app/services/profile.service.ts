import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

// services
import { AuthService } from './auth.service';

// models
import { User } from '../models/user.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  updateProfile(data: User) {
    data = {
      ...data,
      uid: this.authService.user.uid,
      role: this.authService.user.role,
    };

    return this.http.put(
      `${base_url}/users/${this.authService.uid}`,
      data,
      this.authService.headers
    );
  }
}
