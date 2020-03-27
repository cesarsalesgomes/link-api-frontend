import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import Constants from '../../constants';

export interface Vehicle {
  _id: string;
  vehicle: string;
  brand: string;
  year: number;
  description: string;
  created: Date;
  updated: Date;
}

export interface VehicleDTO {
  vehicle: string;
  brand: string;
  year: number;
  description: string;
}

export interface VehiclesPaginatedResponse {
  vehicles: Vehicle[];
  total: number;
}

@Injectable()
export class VehiclesService {
  constructor(private http: HttpClient) { }

  async getVehiclesPaginated(pageIndex: number, pageSize: number): Promise<VehiclesPaginatedResponse> {
    const params = new HttpParams()
      .set('pageIndex', String(pageIndex))
      .set('pageSize', String(pageSize));

    return this.http
      .get<VehiclesPaginatedResponse>(
        environment.linkApi + Constants.VEHICLES_PAGINATED_API_ROUTE,
        {
          params
        }
      )
      .toPromise();
  }

  async getVehicle(id: string): Promise<Vehicle> {
    return this.http
      .get<Vehicle>(environment.linkApi + Constants.VEHICLES_API_ROUTE + id)
      .toPromise();
  }

  async updateVehicle(id: string, vehicle: VehicleDTO): Promise<Vehicle> {
    return this.http
      .put<Vehicle>(environment.linkApi + Constants.VEHICLES_API_ROUTE + id, vehicle)
      .toPromise();
  }

  async deleteVehicle(id: string): Promise<void> {
    return this.http
      .delete<void>(environment.linkApi + Constants.VEHICLES_API_ROUTE + id)
      .toPromise();
  }
}
