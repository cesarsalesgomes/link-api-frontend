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
}
