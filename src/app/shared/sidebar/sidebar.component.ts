import { Component, OnInit } from '@angular/core';

// services
import { AuthService } from '../../services/auth.service';

// models
import { User } from '../../models/user.model';
import { Menu } from '../../models/menu.model';
import { _Menu } from 'src/app/interfaces/menu.interfaces';

// interfaces
// import {  } from '../../interfaces/menu.interfaces';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css'],
})
export class SidebarComponent implements OnInit {
  public user!: User;
  public menu!: Menu[];

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.user = this.authService.user;

    const loadedMenu = localStorage.getItem('menu');
    this.menu = loadedMenu !== null && JSON.parse(loadedMenu);
  }

  logout() {
    this.authService.logout();
  }
}
