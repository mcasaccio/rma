import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

// services
import { AuthService } from '../../../services/auth.service';
import { OrderService } from '../../../services/order.service';

// models
import { User, Client } from '../../../models/user.model';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
})
export class CreateComponent implements OnInit {
  public formSubmitted = false;
  public loading = true;
  public user!: User;
  public clients!: Client[];
  public orderCreateForm!: FormGroup;

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getClients();
    this.user = this.authService.user;
    this.orderCreateForm = this.formBuilder.group({
      client: ['', Validators.required],
      servedBy: [this.user.name, [Validators.required]],
      reason: ['', [Validators.required]],
      provider: ['', [Validators.required]],
      product: ['', [Validators.required]],
      type: ['', [Validators.required]],
    });
  }

  getClients() {
    this.loading = true;
    this.orderService.getClients().subscribe((clients) => {
      this.clients = clients;
      this.loading = false;
    });
  }

  invalidFormField(field: string): boolean {
    if (this.orderCreateForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  createOrder() {
    this.formSubmitted = true;
    if (this.orderCreateForm.invalid) {
      return;
    }
    this.loading = true;

    this.orderCreateForm.value.servedBy = this.user.uid;
    this.orderService.createOrder(this.orderCreateForm.value).subscribe(
      (idNewOrderCreated) => {
        this.loading = false;
        this.router.navigate(['dashboard', 'view', idNewOrderCreated]);
        Swal.fire('Orden', 'Orden creada exitosamente', 'success');
      },
      (err) => {
        this.loading = false;
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }

  //experimental function
  cambiarRole(usuario: User) {
    this.authService.saveUser(usuario).subscribe((resp) => {
      console.log('usuario guardado', resp);
    });
  }
}
