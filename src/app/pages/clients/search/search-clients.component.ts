import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import Swal from 'sweetalert2';

// services
import { ClientService } from 'src/app/services/client.service';

// models
import { Order } from '../../../models/order.model';

@Component({
  selector: 'app-search-clients',
  templateUrl: './search-clients.component.html',
  styleUrls: ['./search-clients.component.css'],
})
export class SearchClientsComponent implements OnInit {
  public formSubmitted = false;
  public loading = false;
  public clients: any[] = [];
  public searchClientForm!: FormGroup;

  constructor(
    private clientService: ClientService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchClientForm = this.formBuilder.group({
      searchTerm: ['']
    });

    this.searchClient()
   
  }

  invalidFormField(field: string): boolean {
    if (this.searchClientForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  searchClient() {
    this.formSubmitted = true;
    if (this.searchClientForm.invalid) {
      return;
    }
    this.loading = true;

    this.clientService.searchClient(this.searchClientForm.value).subscribe(
      (clientResponse) => {
        this.loading = false;
        this.clients = clientResponse;
      },
      (err) => {
        this.loading = false;
        Swal.fire('Error', err.error.msg, 'error');
      }
    );
  }
}
