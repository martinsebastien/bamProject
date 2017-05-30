import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewFormProvider } from '../../providers/new-form/new-form';
import { Subscription } from 'rxjs';
import { UsersProvider } from '../../providers/users/users';

import { User } from '../../models/user';


@IonicPage()
@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
})
export class SearchUserPage {
  public users: User[] = [];
  public currentUsers: User[] = [];
  public searchTerm: string = '';
  private usersSubscription: Subscription;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public newForm: NewFormProvider,
    public usersProvider: UsersProvider,
  ) { }

  ionViewDidLoad() {
    this.initializeUsers();
  }

  initializeUsers() {
    this.usersSubscription = this.usersProvider.all().subscribe(users => {
      this.users = users;
      this.currentUsers = users;
    });
  }

  getUsers(ev: any) {
    this.currentUsers = this.users;
    this.searchTerm = ev.target.value;

    if (this.searchTerm && this.searchTerm.trim() != '') {
      this.currentUsers = this.currentUsers.filter((user) => {
        return (user.lastname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || user.firstname.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || user.email.indexOf(this.searchTerm.toLowerCase()) > -1 || user.private_phone.trim().indexOf(this.searchTerm.trim()) > -1 || user.public_phone.trim().indexOf(this.searchTerm.trim()) > -1)
      })
    }
  }

  public addUser(user) {
    this.newForm.addUser(user);
    console.log(this.newForm.getUsers());
    this.navCtrl.pop();
  }


}
