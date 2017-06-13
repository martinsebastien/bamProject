import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Form } from '../../models/form';

import { EditSignaturesPage } from '../edit-signatures/edit-signatures';
import { EditRoomPage } from '../edit-room/edit-room';
import { HomePage } from '../home/home';
import { EditEnergyPage } from '../edit-energy/edit-energy';

import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { FormsProvider } from '../../providers/forms/forms';
import { RoomsProvider } from '../../providers/rooms/rooms';
import { EnergyProvider } from '../../providers/energy/energy';

@IonicPage()
@Component({
  selector: 'page-edit-form',
  templateUrl: 'edit-form.html',
})
export class EditFormPage {

  private usersSubscription: Subscription;
  private roomsSubscription: Subscription;
  private energySubscription: Subscription;
  public form: Form;
  public id: string;
  public rooms = [];
  public energy = [];
  public newEnergy: any;
  public mainHome: any;

  constructor(
    public navCtrl: NavController,
    public params: NavParams,
    public formsProvider: FormsProvider,
    public roomsProvider: RoomsProvider,
    public energyProvider: EnergyProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
  ) {}

  ionViewDidLoad() {
    this.id = this.params.get('form_id');
    this.initializeForm();
    this.initializeRooms(this.id);
  }

  initializeForm() {
    this.usersSubscription = this.formsProvider.get(this.id).subscribe(form => {
      this.form = form
      for(let lot of this.form.lots) {
        if (lot.main_home == true) {
          this.mainHome = lot;
          this.initializeEnergy(lot.id)
          break
        }
      }
  });
  }

  initializeRooms(id) {
    this.roomsSubscription = this.roomsProvider.getRooms(id).subscribe(rooms => {
      rooms ? this.rooms = rooms : console.log(rooms);
    })
  }

  initializeEnergy(id) {
    console.log(id)
    this.energySubscription = this.energyProvider.getEnergy(id).subscribe(energy => {
      this.energy = energy;
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

  public createEnergy() {
    const object = { 'energy_id': 1 }
    this.confirmEnergy(object)
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

  public confirmEnergy(object) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: `Êtes-vous certain de vouloir ajouter un relevé de compteur ?`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          }
        },
        {
          text: 'Créer',
          handler: () => {
            this.energySubscription = this.energyProvider.create(object).subscribe(consumptions => {
              this.newEnergy = consumptions.new;
              this.energy = consumptions.energy;
              this.navCtrl.push(EditEnergyPage, this.newEnergy);
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

  public confirmDeleteEnergy(energy) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: `Êtes-vous certain de vouloir supprimer ce compteur ?`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteEnergy(energy);
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
    this.roomsSubscription = this.roomsProvider.deleteRoom(room).subscribe(rooms => {
      this.rooms = rooms
    })
  }
  public deleteEnergy(energy) {
    console.log(energy)
    this.energySubscription = this.energyProvider.deleteEnergy(energy).subscribe(consumptions => {
      this.energy = consumptions
    })
  }

  public showEditRoom(room) {
    this.navCtrl.push(EditRoomPage, room);
  }

  public showEditEnergy(energy) {
    this.navCtrl.push(EditEnergyPage, energy);
  }

}
