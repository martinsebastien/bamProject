import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Item } from '../../models/item';

import { EditItemPage } from '../edit-item/edit-item';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { ItemsProvider } from '../../providers/items/items';

@IonicPage()
@Component({
  selector: 'page-edit-room',
  templateUrl: 'edit-room.html',
})
export class EditRoomPage {

  private itemsSubscription: Subscription;
  public room: any;
  public items = [];

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public itemsProvider: ItemsProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) { }

  ionViewDidLoad() {
    this.room = this.params.data;
    this.initializeItems(this.room.id);
  }

  initializeItems(id) {
    this.itemsSubscription = this.itemsProvider.getItems(id).subscribe(items => {
      items ? this.itemsProvider.items = items : console.log(items);
    })
  }

  public showEditItemPage(id): void {
    this.navCtrl.push(EditItemPage, id);
  }

  public createItem(object) {
    console.log(object)
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: `Êtes-vous certain de vouloir créer un item ?`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          }
        },
        {
          text: 'Créer',
          handler: () => {
            this.itemsSubscription = this.itemsProvider.create(object).subscribe(items => {
              this.itemsProvider.items = items
            })
          }
        }
      ]
    });
    confirm.present();
  }

  public confirmDeleteItem(item) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: `Êtes-vous certain de vouloir supprimer cet item ?`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteItem(item);
          }
        }
      ]
    });
    confirm.present();
  }

  public presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

  public deleteItem(item) {
    console.log(item)
    this.itemsSubscription = this.itemsProvider.deleteItem(item).subscribe(items => {
      this.itemsProvider.items = items
    })
  }

  public showEditItem(item) {
    this.navCtrl.push(EditItemPage, item);
  }

}
