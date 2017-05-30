import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewFormProvider } from '../../providers/new-form/new-form';

@IonicPage()
@Component({
  selector: 'page-search-user',
  templateUrl: 'search-user.html',
})
export class SearchUserPage {

  constructor(
    public navCtrl: NavController, 
    public navParams: NavParams,
    public newForm: NewFormProvider,
    ) {}

  ionViewDidLoad() {
    console.log(this.newForm.getUser());
    this.newForm.addUser(2);
  }

}
