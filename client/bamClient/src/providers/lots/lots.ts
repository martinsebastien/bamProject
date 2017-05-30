import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../services/http.service';
import 'rxjs/add/operator/map';

import { Lot } from '../../models/lot';


@Injectable()
export class LotsProvider {

  constructor(
    public httpService: HttpService,
    ) {}

    all(): Observable<Lot[]> {
      return this.httpService
        .get('lots')
        .map(data => data.json())
        .map(users => users.map(user => Lot.build(user)));
    }

    get(id: string): Observable<any> {
      return this.httpService
        .get(`lots/${id}`)
        .map(data => data.json())
        .map(lot => Lot.build(lot))
    }
}
