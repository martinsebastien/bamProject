import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { User } from '../../models/user';
import { FormsProvider } from '../../providers/forms/forms'



@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public users: User[] = [];

  private usersSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public formsProvider: FormsProvider,
    ) {}

    ionViewWillLoad() {
      //Load the users
      this.usersSubscription = this.formsProvider.all().subscribe(users => this.users = users);
    }

}
