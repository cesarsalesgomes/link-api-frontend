import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import Constants from '../../../constants';
import { Vehicle, VehiclesService } from '../vehicles.service';

@Component({
  selector: 'app-vehicle-new',
  templateUrl: './vehicle-new.component.html',
  styleUrls: ['./vehicle-new.component.scss']
})
export class VehicleNewComponent {
  vehicle: Vehicle;

  form: FormGroup;

  creating: boolean

  constructor(
    private formBuilder: FormBuilder,
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

  async createVehicle(): Promise<void> {
    this.creating = true;

    try {
      this.vehicle = await this.vehicleService.createVehicle(this.form.value);

      this.snackBar.open(Constants.VEHICLE_SUCCESSFULLY_CREATED, '', {
        duration: Constants.SNACK_BAR_DURATION
      });

      this.router.navigate([Constants.VEHICLES_ROUTE + this.vehicle._id]);
    } catch (error) {
      const { message } = error?.error;

      this.snackBar.open(message || Constants.UNEXPECTED_ERROR, '', {
        duration: Constants.SNACK_BAR_DURATION
      });
    }

    this.creating = false;
  }
}
