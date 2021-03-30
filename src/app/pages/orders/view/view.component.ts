import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

// services
import { OrderService } from '../../../services/order.service';

// models
import { Order } from '../../../models/order.model';
import { Client } from '../../../models/user.model';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.css'],
})
export class ViewComponent implements OnInit {
  public formSubmitted = false;
  public loading = true;
  public order!: Order;
  public clients!: Client[];
  public orderForm!: FormGroup;

  constructor(
    private orderService: OrderService,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.getOrderById(`${id}`);
    });

    this.orderForm = this.formBuilder.group({
      _id: ['', Validators.required],
      order: ['', Validators.required],
      client: ['', Validators.required],
      createAt: ['', Validators.required],
      product: ['', Validators.required],
      provider: ['', Validators.required],
      reason: ['', Validators.required],
      servedBy: ['', Validators.required],
      status: ['', Validators.required],
      type: ['', Validators.required],
    });
  }

  getOrderById(id: string) {
    this.loading = true;

    this.orderService.getOrderById(id).subscribe((orderResponse) => {
      this.order = orderResponse.order;
      this.clients = orderResponse.users;
      this.loading = false;

      this.orderForm.setValue({
        _id: this.order._id,
        order: this.order.order,
        client: this.order.client._id,
        createAt: this.order.createAt,
        product: this.order.product,
        provider: this.order.provider,
        reason: this.order.reason,
        servedBy: this.order.servedBy,
        status: this.order.status,
        type: this.order.type,
      });
    });
  }

  invalidFormField(field: string): boolean {
    if (this.orderForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  updateOrder() {
    this.formSubmitted = true;
    if (this.orderForm.invalid) {
      return;
    }
    this.loading = true;
    this.orderService.updateOrder(this.orderForm.value).subscribe(
      () => {
        this.loading = false;
        Swal.fire('Orden', 'Cambios realizados correctamente', 'success');
      },
      (err) => {
        this.loading = false;
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
