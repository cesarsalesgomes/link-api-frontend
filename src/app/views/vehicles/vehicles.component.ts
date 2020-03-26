import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Vehicle, VehiclesService } from './vehicles.service';

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  vehicles: Vehicle[] = [];

  displayedColumns: string[] = ['vehicle', 'brand', 'year', 'description'];

  pageIndex = 0

  pageSize = 10;

  total: number;

  constructor(private vehicleService: VehiclesService) { }

  async ngOnInit(): Promise<void> {
    const res = await this.vehicleService.getVehiclesPaginated(this.pageIndex, this.pageSize);

    this.total = res.total;
    this.vehicles = res.vehicles;
  }

  async pageEvent(event: PageEvent): Promise<void> {
    const res = await this.vehicleService.getVehiclesPaginated(event.pageIndex, event.pageSize);

    this.total = res.total;
    this.vehicles = res.vehicles;
  }
}
