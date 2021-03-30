import { Component, OnInit } from '@angular/core';

// services
import { OrderService } from '../../services/order.service';
import { AuthService } from 'src/app/services/auth.service';

// models
import { Dashboard } from 'src/app/models/order.model';

// interfaces
import { _Dashboard } from '../../interfaces/order.interfaces';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  public dashboard!: Dashboard;
  public loading: boolean = true;
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadOrdersDashboard();
  }

  logout() {
    this.authService.logout();
  }

  loadOrdersDashboard() {
    this.loading = true;
    this.orderService
      .loadOrdersDashboard()
      .subscribe((loadedOrders: _Dashboard) => {
        this.loading = false;
        this.dashboard = loadedOrders;
      });
  }
}
