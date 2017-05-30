import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the NewFormProvider provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class NewFormProvider {

  private users = [];
  private lots = [];

  constructor() {
  }

  public addUser(user) {
    this.users.push(user);
  }

  public getUser() {
    return this.users;
  }

  public addLot(lot) {
    this.lots.push(lot);
  }

  public getLot() {
    return this.lots;
  }

}
