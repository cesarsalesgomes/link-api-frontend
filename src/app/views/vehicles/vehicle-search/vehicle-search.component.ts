import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import Constants from '../../../constants';
import { VehiclesService, Vehicle, VehiclesPaginatedResponse } from '../vehicles.service';

@Component({
  selector: 'app-vehicle-search',
  templateUrl: './vehicle-search.component.html',
  styleUrls: ['./vehicle-search.component.scss']
})
export class VehicleSearchComponent implements OnInit {
  vehicles: Vehicle[] = [];

  displayedColumns: string[] = ['vehicle', 'brand', 'year', 'description'];

  pageIndex = 0

  pageSize = 10;

  total: number;

  loadingVehicles: boolean;

  constructor(private vehicleService: VehiclesService, private router: Router, private snackBar: MatSnackBar) { }

  async ngOnInit(): Promise<void> {
    await this.fetchingVehicles(this.pageIndex, this.pageSize);
  }

  async pageEvent(event: PageEvent): Promise<void> {
    await this.fetchingVehicles(event.pageIndex, event.pageSize);
  }

  private async fetchingVehicles(pageIndex: number, pageSize: number): Promise<void> {
    let res: VehiclesPaginatedResponse;

    this.loadingVehicles = true;

    try {
      res = await this.vehicleService.getVehiclesPaginated(pageIndex, pageSize);

      this.total = res.total;
      this.vehicles = res.vehicles;
    } catch (error) {
      this.snackBar.open(Constants.UNEXPECTED_ERROR, '', {
        duration: Constants.SNACK_BAR_DURATION
      });
    }

    this.loadingVehicles = false;
  }

  detailVehicle(vehicle: Vehicle): void {
    this.router.navigate([Constants.VEHICLES_ROUTE + vehicle._id]);
  }
}
