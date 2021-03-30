import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, pluck } from 'rxjs/operators';

import { environment } from '../../environments/environment';

// services
import { AuthService } from './auth.service';

import {
  _Order,
  _OrderById,
  _Dashboard,
  _formDataUpdateOrder,
} from '../interfaces/order.interfaces';
import { _Client } from '../interfaces/client.interfaces';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  createOrder(formData: any): Observable<string> {
    return this.http
      .post(`${base_url}/orders/create`, formData, this.authService.headers)
      .pipe(
        pluck<any, string>('newOrder', '_id'),
        map((idNewOrderCreated: string) => idNewOrderCreated)
      );
  }

  loadOrdersDashboard(): Observable<_Dashboard> {
    const url = `${base_url}/orders/dashboard`;
    return this.http.get<_Dashboard>(url, this.authService.headers).pipe(
      map<_Dashboard, _Dashboard>((resp) => {
        return {
          total: resp.total,
          pending: resp.pending,
          orders: resp.orders,
        };
      })
    );
  }

  getOrderById(id: string): Observable<_OrderById> {
    const url = `${base_url}/orders/view/${id}`;
    return this.http
      .get<_OrderById>(url, this.authService.headers)
      .pipe(map((order: _OrderById) => order));
  }

  getClients(): Observable<_Client[]> {
    const url = `${base_url}/users`;
    return this.http.get<any>(url, this.authService.headers).pipe(
      pluck('users'),
      map((clientsList: _Client[]) => clientsList)
    );
  }

  updateOrder(formData: _formDataUpdateOrder) {
    formData = {
      ...formData,
      servedBy: formData.servedBy._id,
    };

    return this.http.put(
      `${base_url}/orders/view/${formData._id}`,
      formData,
      this.authService.headers
    );
  }

  searchOrder(formData: any) {

    const url = `${base_url}/orders/search`;
    return this.http
      .post<any>(url, formData, this.authService.headers)
      .pipe(pluck('orderFind'));
  }
}
