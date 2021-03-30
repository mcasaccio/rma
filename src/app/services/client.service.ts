import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { environment } from '../../environments/environment';

// services
import { AuthService } from './auth.service';

// models
import { User } from '../models/user.model';
import { map, pluck } from 'rxjs/operators';
import { Observable } from 'rxjs';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  searchClient(formData: any) {
    const url = `${base_url}/users/clients`;
    return this.http
      .post<any>(url, formData, this.authService.headers)
      .pipe(pluck('usersFound'));
  }

  updateClient(data: User) {
    
    return this.http.put(
      `${base_url}/users/clients/${data.uid}`,
      data,
      this.authService.headers
    );
  }

  getClientById(id: string): Observable<User> {
    const url = `${base_url}/users/clients/${id}`;
    return this.http
      .get(url, this.authService.headers)
      .pipe(pluck('user'));
  }
}
