import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Subscription } from 'rxjs';

import { User } from '../../models/user';
import { FormControl } from '@angular/forms';
import { FormsProvider } from '../../providers/forms/forms';

import { ShowFormPage } from '../show-form/show-form';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  public users: User[] = [];
  public currentUsers: User[] = [];
  public searchTerm: string = '';
  private usersSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public formsProvider: FormsProvider,
    ) {}

    ionViewWillLoad() {
      //Load the users
      this.initializeUsers();
    }

    initializeUsers() {
      this.usersSubscription = this.formsProvider.all().subscribe(users => {
        this.users = users; 
        this.currentUsers = users;
      });
    }

    getUsers(ev: any) {
      this.currentUsers = this.users;
      this.searchTerm = ev.target.value;

      if (this.searchTerm && this.searchTerm.trim() != '') {
        this.currentUsers = this.currentUsers.filter((user) => {
          return (user.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || user.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1)
        })
      }
    }

    showForm({ form_id }: User): void {
      console.log({ form_id })
      this.navCtrl.push(ShowFormPage, { form_id });
    }

}
