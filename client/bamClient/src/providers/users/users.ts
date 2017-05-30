import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../../services/http.service';
import 'rxjs/add/operator/map';

import { User } from '../../models/user';


@Injectable()
export class UsersProvider {

  constructor(
    public httpService: HttpService,
    ) {}

    all(): Observable<User[]> {
      return this.httpService
        .get('users')
        .map(data => data.json())
        .map(users => users.map(user => User.build(user)));
    }

    get(id: string): Observable<any> {
      return this.httpService
        .get(`users/${id}`)
        .map(data => data.json())
        .map(user => User.build(user))
    }
}
