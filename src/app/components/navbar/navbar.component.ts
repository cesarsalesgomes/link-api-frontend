import { Component } from '@angular/core';
import { Router } from '@angular/router';
import Constants from '../../constants';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  constructor(private router: Router) { }

  navigateNewVehicle(): void {
    this.router.navigate([Constants.NEW_VEHICLE_ROUTE]);
  }

  navigateVehiclesSearch(): void {
    this.router.navigate([Constants.VEHICLES_SEARCH_ROUTE]);
  }

  logout(): void {
    localStorage.removeItem(Constants.TOKEN);

    this.router.navigate([Constants.LOGIN_ROUTE]);
  }
}
