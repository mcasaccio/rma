import { NumberSymbol } from '@angular/common';
import { _Client } from './client.interfaces';

export interface _OrderById {
  ok: boolean;
  order: _Order;
  users: _Client[];
}

export interface _Order {
  status: string;
  _id: string;
  client: any;
  servedBy: any;
  reason: string;
  provider: string;
  product: string;
  createAt: string;
  order: number;
  type?: string;
}

export interface _Dashboard {
  orders: _Order[];
  total: number;
  pending: number;
}

export interface _formDataUpdateOrder extends _Order {
  status: string;
}

export interface _Dashboard {
    orders:  _Order[];
    total:   number;
    pending: number;
}