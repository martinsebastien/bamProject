import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Form } from '../../models/form';

import { EditSignaturesPage } from '../edit-signatures/edit-signatures';
import { EditRoomPage } from '../edit-room/edit-room';
import { HomePage } from '../home/home';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { FormsProvider } from '../../providers/forms/forms';
import { RoomsProvider } from '../../providers/rooms/rooms';

@IonicPage()
@Component({
  selector: 'page-edit-form',
  templateUrl: 'edit-form.html',
})
export class EditFormPage {

  private usersSubscription: Subscription;
  private roomsSubscription: Subscription;
  public form: Form;
  public id: string;
  public rooms = [];

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public formsProvider: FormsProvider,
    public roomsProvider: RoomsProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) { }

  ionViewDidLoad() {
    this.id = this.params.get('form_id');
    this.initializeForm();
    this.initializeRooms(this.id);
  }

  initializeForm() {
    this.usersSubscription = this.formsProvider.get(this.id).subscribe(form => this.form = form);
  }

  initializeRooms(id) {
    this.roomsSubscription = this.roomsProvider.getRooms(id).subscribe(rooms => {
      rooms ? this.rooms = rooms : console.log(rooms);
    })
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

  public showSignaturesPage(form): void {
    this.navCtrl.push(EditSignaturesPage, form);
  }

  public createRoom(type) {
    const object = { 'type': type, 'form': this.form.id }
    this.confirm(object)
  }

  public validateForm(object) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: `Êtes-vous certain de vouloir valider ce formulaire ? Il sera impossible de le modifier ou supprmier`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          }
        },
        {
          text: 'Créer',
          handler: () => {
            this.usersSubscription = this.formsProvider.edit(object).subscribe(users => {
              if (users.error) {
                this.presentToast(users.error)
              } else {
                this.formsProvider.users = users;
                this.navCtrl.popToRoot();
                this.presentToast('Formulaire complété avec succès ! Tirer pour rafraichir la liste et pouvoir le consulter')
              }
            })
          }
        }
      ]
    });
    confirm.present();

  }

  public confirm(object) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: `Êtes-vous certain de vouloir créer cette pièce ?`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          }
        },
        {
          text: 'Créer',
          handler: () => {
            this.roomsSubscription = this.roomsProvider.create(object).subscribe(rooms => {
              this.rooms = rooms
            })
          }
        }
      ]
    });
    confirm.present();
  }

  public confirmDeleteRoom(room) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: `Êtes-vous certain de vouloir supprimer cette pièce ?`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteRoom(room);
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

  public deleteRoom(room) {
    console.log(room)
    this.roomsSubscription = this.roomsProvider.deleteRoom(room).subscribe(rooms => {
      this.rooms = rooms
    })
  }

  public showEditRoom(room) {
    this.navCtrl.push(EditRoomPage, room);
  }

}
