import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';

import { NavbarComponent } from '../../components/navbar/navbar.component';
import { VehiclesRoutingModule } from './vehicles-routing.module';
import { VehiclesComponent } from './vehicles.component';
import { VehiclesService } from './vehicles.service';

@NgModule({
  declarations: [VehiclesComponent, NavbarComponent],
  imports: [
    CommonModule,
    VehiclesRoutingModule,
    MatToolbarModule,
    MatTableModule,
    MatPaginatorModule
  ],
  providers: [VehiclesService]
})
export class VehiclesModule { }
