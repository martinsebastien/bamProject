import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { HttpService } from '../../services/http.service';

import { ToastController } from 'ionic-angular';
import { Consumption } from '../../models/consumption';

@Injectable()
export class EnergyProvider {
  public energy = [];

  constructor(
    public toastCtrl: ToastController,
    public httpService: HttpService,
  ) {}

  getEnergy(id: string): Observable<any> {
    return this.httpService
      .get(`energy?lot_id=${id}`)
      .map(data => data.json())
      .map(energy => {
          return energy.map(energy => {
            return Consumption.build(energy)
        })
      })
  }

  edit(object): Observable<any> {
    const id = object.id;
    return this.httpService
      .put(`energy/${id}`, object)
      .map(res => res.json())
      .map(energy => energy.map(energy => Consumption.build(energy)))
  }

  create(object): Observable<any> {
    return this.httpService
      .post(`energy`, object)
      .map(res => res.json())
      .map(energy => energy.map(energy => Consumption.build(energy)))
  }

  public deleteEnergy(energyToDelete) {
    return this.httpService
      .delete(`energy/${energyToDelete}`)
      .map(res => res.json())
      .map(energy => energy.map(energy => Consumption.build(energy)))
  }

}
