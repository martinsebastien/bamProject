import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewFormProvider } from '../../providers/new-form/new-form';

import { SearchUserPage } from '../search-user/search-user';

@IonicPage()
@Component({
  selector: 'page-new-state',
  templateUrl: 'new-state.html',
})
export class NewStatePage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public newForm: NewFormProvider
    ) {}

  ionViewDidLoad() {
    console.log(this.newForm.getUser())
    this.newForm.addUser(1);
  }

  showSearchUser() {
    this.navCtrl.push(SearchUserPage);
  }

}
