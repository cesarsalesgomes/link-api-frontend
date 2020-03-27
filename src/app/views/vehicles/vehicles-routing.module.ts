import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VehiclesComponent } from './vehicles.component';
import { VehicleSearchComponent } from './vehicle-search/vehicle-search.component';
import { VehicleDetailedComponent } from './vehicle-detailed/vehicle-detailed.component';
import { VehicleNewComponent } from './vehicle-new/vehicle-new.component';

const routes: Routes = [
  {
    path: '',
    component: VehiclesComponent,
    children: [
      {
        path: 'search',
        component: VehicleSearchComponent
      },
      {
        path: 'new',
        component: VehicleNewComponent
      },
      {
        path: ':id',
        component: VehicleDetailedComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VehiclesRoutingModule { }
