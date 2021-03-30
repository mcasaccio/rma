import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

// services
import { OrderService } from '../../../services/order.service';

// models
import { Order } from '../../../models/order.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent implements OnInit {
  public formSubmitted = false;
  public loading = false;
  public order: any[] = [];
  public searchForm!: FormGroup;

  constructor(
    private orderService: OrderService,
    private formBuilder: FormBuilder
  ) {}

  ngOnInit(): void {
    this.searchForm = this.formBuilder.group({
      searchTerm: ['', Validators.required],
      completed: [false],
      warranty: [true],
    })
  }

  invalidFormField(field: string): boolean {
    if (this.searchForm.get(field)!.invalid && this.formSubmitted) {
      return true;
    } else {
      return false;
    }
  }

  searchTerm() {

    if (!this.searchForm.value.searchTerm) {
        return;
      }

    this.formSubmitted = true;
    if (this.searchForm.invalid) {
      return;
    }
    this.loading = true;
  

    this.orderService.searchOrder(this.searchForm.value).subscribe(
        (orderResponse) => {
          this.loading = false;
          this.order = orderResponse;
        },
        (err) => {
          this.loading = false;
          Swal.fire('Error', err.error.msg, 'error');
        }
      );
      
}



}
