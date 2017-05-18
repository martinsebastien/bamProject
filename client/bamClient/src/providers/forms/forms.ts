import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { HttpService } from '../services/http.service';
import 'rxjs/add/operator/map';

/*
  Generated class for the FormsProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class FormsProvider {

  constructor(public http: Http) {
    console.log('Hello FormsProvider Provider');
  }

}
