import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../services/http.service';
import 'rxjs/add/operator/map';

import { Signature } from '../../models/signature';

@Injectable()
export class SignaturesProvider {

  constructor(
    public httpService: HttpService,
    ) {}

    all(): Observable<Signature[]> {
      return this.httpService
        .get('signatures')
        .map(data => data.json())
        .map(users => users.map(signature => Signature.build(signature)));
    }

    allNotComplete(): Observable<Signature[]> {
      return this.httpService
        .get('forms?completed=false')
        .map(data => data.json())
        .map(users => users.map(signature => Signature.build(signature)));
    }

    get(id: string): Observable<any> {
      return this.httpService
        .get(`signatures/${id}`)
        .map(data => data.json())
        .map(signature => Signature.build(signature))
    }

    create(object): Observable<any> {
      return this.httpService
        .post(`signatures`, object)
        .map(res => res.json())
    }
}
