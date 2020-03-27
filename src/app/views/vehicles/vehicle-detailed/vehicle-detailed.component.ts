import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Constants from '../../../constants';
import { Vehicle, VehiclesService } from '../vehicles.service';

@Component({
  selector: 'app-vehicle-detailed',
  templateUrl: './vehicle-detailed.component.html',
  styleUrls: ['./vehicle-detailed.component.scss']
})
export class VehicleDetailedComponent implements OnInit {
  idVehicle: string;

  vehicle: Vehicle;

  loading: boolean;

  form: FormGroup;

  fetching: boolean

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private vehicleService: VehiclesService,
    private snackBar: MatSnackBar,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      vehicle: [null],
      brand: [null],
      year: [null],
      description: [null]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.subscribe(async (params) => {
      this.loading = true;

      this.idVehicle = params.get('id');

      try {
        this.vehicle = await this.vehicleService.getVehicle(this.idVehicle);
        this.updateForm();
      } catch (error) {
        this.vehicle = null;
      }

      this.loading = false;
    });
  }

  async updateVehicle(): Promise<void> {
    this.fetching = true;

    try {
      this.vehicle = await this.vehicleService.updateVehicle(this.idVehicle, this.form.value);

      this.snackBar.open(Constants.VEHICLE_UPDATED_SUCCESSFULLY, '', {
        duration: Constants.SNACK_BAR_DURATION
      });
    } catch (error) {
      const { message } = error?.error;

      this.snackBar.open(message || Constants.UNEXPECTED_ERROR, '', {
        duration: Constants.SNACK_BAR_DURATION
      });
    }

    this.fetching = false;
  }

  async deleteVehicle(): Promise<void> {
    this.fetching = true;

    try {
      await this.vehicleService.deleteVehicle(this.idVehicle);

      this.snackBar.open(Constants.VEHICLE_SUCCESSFULLY_DELETED, '', {
        duration: Constants.SNACK_BAR_DURATION
      });
      this.router.navigate([Constants.VEHICLES_SEARCH_ROUTE]);
    } catch (error) {
      this.snackBar.open(Constants.UNEXPECTED_ERROR, '', {
        duration: Constants.SNACK_BAR_DURATION
      });
    }

    this.fetching = false;
  }

  updateForm(): void {
    this.form.controls.vehicle.setValue(this.vehicle.vehicle);
    this.form.controls.brand.setValue(this.vehicle.brand);
    this.form.controls.year.setValue(this.vehicle.year);
    this.form.controls.description.setValue(this.vehicle.description);
  }

  navigateVehiclesSearch(): void {
    this.router.navigate([Constants.VEHICLES_SEARCH_ROUTE]);
  }
}
