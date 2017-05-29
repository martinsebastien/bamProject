import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Form } from '../../models/form';
import { FormsProvider } from '../../providers/forms/forms';

/**
 * Generated class for the ShowFormPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-show-form',
  templateUrl: 'show-form.html',
})
export class ShowFormPage {

  private usersSubscription: Subscription;
  public form: Form;
  public id: string;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public formsProvider: FormsProvider,
  ) { }

  ionViewDidLoad() {
    this.id = this.params.get('form_id');
    this.initializeUsers();
  }

  initializeUsers() {
    this.usersSubscription = this.formsProvider.get(this.id).subscribe(form => this.form = form);
  }

  public countRooms(lots): number {
    let nbr = 0;
    for(let n = 0; n < lots.length; n++){
      const lot = lots[n];
      if (lot.main_home == true) {
        const rooms = lot.rooms;
        for(let r = 0; r < rooms.length; r++) {
          nbr++;
        }
      }
    }
    return nbr;
  }

  public getSignDate(signatures): string{
    console.log(signatures[0].date)
    return signatures[0].date
  }
}
