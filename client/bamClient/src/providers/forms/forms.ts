import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../services/http.service';
import 'rxjs/add/operator/map';

import { User } from '../../models/user';
import { Form } from '../../models/form';

/*
  Generated class for the FormsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FormsProvider {

  constructor(
    public httpService: HttpService,
    ) {}

    all(): Observable<User[]> {
      return this.httpService
        .get('forms?completed=true')
        .map(data => data.json())
        .map(users => users.map(user => User.build(user)));
    }

    get(id: string): Observable<any> {
      return this.httpService
        .get(`forms/${id}`)
        .map(data => data.json())
        .map(form => Form.build(form))
    }
}
