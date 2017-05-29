import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Form } from '../../models/form';
import { ItemGalleryPage } from '../item-gallery/item-gallery';
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
    for (let n = 0; n < lots.length; n++) {
      const lot = lots[n];
      if (lot.main_home == true) {
        const rooms = lot.rooms;
        for (let r = 0; r < rooms.length; r++) {
          nbr++;
        }
      }
    }
    return nbr;
  }

  public getSignature(userId, signatures): string {
    let signature: string;
    for (let s = 0; s < signatures.length; s++) {
      if (signatures[s].user_id == userId) {
        signature = signatures[s].image;
      }
    }
    return signature
  }

  public displayRole(id): string {
    let role: string;
    id == 2 ? role = "Locataire" : role = "BAM SA";
    return role;
  }

  public showPictures(pictures): void {
      this.navCtrl.push(ItemGalleryPage, pictures);
  }

}
