import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { NavbarComponent } from '../../components/navbar/navbar.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesService } from './vehicles.service';
import { VehicleDetailedComponent } from './vehicle-detailed/vehicle-detailed.component';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';


@NgModule({
  declarations: [VehiclesComponent, NavbarComponent, VehicleDetailedComponent, VehicleSearchComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule,
    MatProgressSpinnerModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  providers: [VehiclesService]
})
export class VehiclesModule { }
