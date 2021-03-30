import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

import Swal from 'sweetalert2';

// services
import { ClientService } from 'src/app/services/client.service';

// models
import { User } from '../../../models/user.model';

@Component({
  selector: 'app-view-client',
  templateUrl: './view-client.component.html',
  styleUrls: ['./view-client.component.css'],
})
export class ViewClientComponent implements OnInit {
  public formSubmitted = false;
  public loading = true;
  public client!: User;
  public clientUpdateForm!: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clientService: ClientService
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      let id = params.get('id');
      this.getClientById(`${id}`);
    });

    this.clientUpdateForm = this.formBuilder.group({
      uid: ['', Validators.required],
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  invalidFormField(field: string): boolean {
    if (this.clientUpdateForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  getClientById(id: string) {
    this.loading = true;

    this.clientService.getClientById(id).subscribe((clientResponse) => {
      this.client = clientResponse;

      this.loading = false;

      this.clientUpdateForm.setValue({
        uid: this.client.uid,
        name: this.client.name,
        email: this.client.email,
      });
    });
  }

  updateClient() {
    this.formSubmitted = true;
    if (this.clientUpdateForm.invalid) {
      return;
    }
    this.loading = true;
    this.clientService.updateClient(this.clientUpdateForm.value).subscribe(
      () => {
        const { name, email } = this.clientUpdateForm.value;
        this.client.name = name;
        this.client.email = email;
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
