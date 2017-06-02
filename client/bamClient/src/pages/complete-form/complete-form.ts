import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { FormsProvider } from '../../providers/forms/forms';
import { User } from '../../models/user';
import { EditFormPage } from '../edit-form/edit-form';

import { Subscription } from 'rxjs';

/**
 * Generated class for the CompleteFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-complete-form',
  templateUrl: 'complete-form.html',
})
export class CompleteFormPage {

  public users: User[] = [];
  public currentUsers: User[] = [];
  public searchTerm: string = '';
  private usersSubscription: Subscription;

  constructor(
    public navCtrl: NavController,
    public formsProvider: FormsProvider,
  ) { }

  ionViewWillLoad() {
    //Load the users
    this.initializeUsers();
  }

  initializeUsers() {
    this.usersSubscription = this.formsProvider.allNotComplete().subscribe(users => {
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
    console.log({ form_id });
    this.navCtrl.push(EditFormPage, { form_id });
  }


}
