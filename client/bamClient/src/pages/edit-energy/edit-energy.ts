import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';


import { EnergyProvider } from '../../providers/energy/energy';

@IonicPage()
@Component({
  selector: 'page-edit-energy',
  templateUrl: 'edit-energy.html',
})
export class EditEnergyPage {

  energy: any;
  energyChange = <any>{};  

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public energyProvider: EnergyProvider,
  ) {}

  ionViewDidLoad() {
    this.energy = this.navParams.data;
    this.energyChange.id = this.energy.id;
  }

  submitEnergy() {
    this.energyProvider.edit(this.energyChange).subscribe(energy => {
      this.energyProvider.energy = energy
    });
    this.navCtrl.pop();
  }
}
