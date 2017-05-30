import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map';
import { ToastController } from 'ionic-angular';

@Injectable()
export class NewFormProvider {

  private users = [];
  private lots = [];

  constructor(
    public toastCtrl: ToastController,
  ) { }

  public addUser(user) {
    let isPresent: boolean = false;
    for (let i = 0; i < this.users.length; i++) {
      this.users[i].id == user.id ? isPresent = true : console.log(user);
    }

    !isPresent ? this.users.push(user) : this.presentToast('Utilisateur déjà sélectionné');
  }

  public getUsers() {
    return this.users;
  }

  public deleteUser(userToDelete) {
    this.users = this.users.filter((user) => {
      return user.id != userToDelete.id;
    })
  }

  public addLot(lot) {
    let isPresent: boolean = false;
    for (let i = 0; i < this.lots.length; i++) {
      this.lots[i].id == lot.id ? isPresent = true : console.log(lot);
    }

    !isPresent ? this.lots.push(lot) : this.presentToast('Lot déjà sélectionné');
  }

  public getLots() {
    return this.lots;
  }

  public deleteLot(lotToDelete) {
    this.lots = this.lots.filter((lot) => {
      return lot.id != lotToDelete.id;
    })
  }


  public resetData() {
    this.lots = [];
    this.users = [];
  }

  public presentToast(text) {
    let toast = this.toastCtrl.create({
      message: text,
      duration: 3000
    });
    toast.present();
  }

}
