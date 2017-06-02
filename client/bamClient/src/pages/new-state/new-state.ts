import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewFormProvider } from '../../providers/new-form/new-form';
import { AlertController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { FormsProvider } from '../../providers/forms/forms';
import { SearchUserPage } from '../search-user/search-user';
import { SearchLotPage } from '../search-lot/search-lot';

@IonicPage()
@Component({
  selector: 'page-new-state',
  templateUrl: 'new-state.html',
})
export class NewStatePage {

  public users = [];
  public lots = [];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public newForm: NewFormProvider,
    public alertCtrl: AlertController,
    public toastCtrl: ToastController,
    public formsProvider: FormsProvider,
  ) { }

  ionViewDidLoad() {
    this.users = this.newForm.getUsers();
    this.lots = this.newForm.getLots();
  }

  public showSearchUser() {
    this.navCtrl.push(SearchUserPage);
  }

  public showSearchLot() {
    this.navCtrl.push(SearchLotPage);
  }

  public deleteUser(user) {
    this.newForm.deleteUser(user);
    this.users = this.newForm.getUsers();
  }

  public deleteLot(lot) {
    this.newForm.deleteLot(lot);
    this.lots = this.newForm.getLots();
  }

  public confirm() {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation',
      message: `Êtes-vous certain des informations remplies ? Le formulaire ne pourra être supprimé en cas d'erreur`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.presentToast('Création annulée');
          }
        },
        {
          text: 'Créer',
          handler: () => {
            this.newForm.build().subscribe(data => {
              if (data.error) {
                this.presentToast(data.error)
              } else {
                this.presentToast(data.response)
                this.navCtrl.pop();
                this.newForm.resetData();
              }
            });
          }
        }
      ]
    });
    confirm.present();
  }

  public confirmDeleteLot(lot) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: `Êtes-vous certain de vouloir retirer ce Lot ?`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.presentToast('Action annulée');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteLot(lot);
          }
        }
      ]
    });
    confirm.present();
  }

  public confirmDeleteUser(user) {
    let confirm = this.alertCtrl.create({
      title: 'Confirmation de suppression',
      message: `Êtes-vous certain de vouloir retirer ce locataire ?`,
      buttons: [
        {
          text: 'Annuler',
          handler: () => {
            this.presentToast('Action annulée');
          }
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.deleteUser(user);
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


}
