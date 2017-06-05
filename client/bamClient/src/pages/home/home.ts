import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { User } from '../../models/user';
import { FormsProvider } from '../../providers/forms/forms';

import { ShowFormPage } from '../show-form/show-form';
import { NewStatePage } from '../new-state/new-state';
import { CompleteFormPage } from '../complete-form/complete-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public searchTerm: string = '';
  public users: User[] = this.formsProvider.users;
  private usersSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public formsProvider: FormsProvider,
  ) { }

  ionViewWillLoad() {
    //Load the users
    this.initializeUsers();
  }

  doRefresh(refresher) {
    this.usersSubscription = this.formsProvider.all().subscribe(users => {
      this.formsProvider.users = users;
      this.formsProvider.currentUsers = users;
      this.users = this.formsProvider.users
      refresher.complete();
    });
  }

  initializeUsers() {
    this.usersSubscription = this.formsProvider.all().subscribe(users => {
      this.formsProvider.users = users;
      this.formsProvider.currentUsers = users;
      this.users = this.formsProvider.users
    });
  }

  getUsers(ev: any) {
    this.formsProvider.currentUsers = this.formsProvider.users;
    this.searchTerm = ev.target.value;

    if (this.searchTerm && this.searchTerm.trim() != '') {
      this.formsProvider.currentUsers = this.formsProvider.currentUsers.filter((user) => {
        return (user.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || user.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
      })
    }
  }

  showForm({ form_id }: User): void {
    this.navCtrl.push(ShowFormPage, { form_id });
  }

  completeForm(): void {
    this.navCtrl.push(CompleteFormPage);
  }

  createNew(): void {
    this.navCtrl.push(NewStatePage);
  }

}
