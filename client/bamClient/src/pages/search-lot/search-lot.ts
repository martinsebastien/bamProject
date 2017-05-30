import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NewFormProvider } from '../../providers/new-form/new-form';
import { Subscription } from 'rxjs';
import { LotsProvider } from '../../providers/lots/lots';

import { Lot } from '../../models/lot';
import { Building } from '../../models/building';


@IonicPage()
@Component({
  selector: 'page-search-lot',
  templateUrl: 'search-lot.html',
})
export class SearchLotPage {
  public lots: Lot[] = [];
  public currentLots: Lot[] = [];
  public searchTerm: string = '';
  private lotsSubscription: Subscription;


  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public newForm: NewFormProvider,
    public lotsProvider: LotsProvider,
  ) { }

  ionViewDidLoad() {
    this.initializeLots();
  }

  initializeLots() {
    this.lotsSubscription = this.lotsProvider.all().subscribe(lots => {
      this.lots = lots;
      this.currentLots = lots;
    });
  }

  getLots(ev: any) {
    this.currentLots = this.lots;
    this.searchTerm = ev.target.value;

    if (this.searchTerm && this.searchTerm.trim() != '') {
      this.currentLots = this.currentLots.filter((lot) => {
        return (lot.number == parseInt(this.searchTerm) || lot.lot_type.toLowerCase().indexOf(this.searchTerm.toLowerCase()) > -1 || lot.floor == parseInt(this.searchTerm) || lot.building_name.trim().indexOf(this.searchTerm.trim()) > -1 || lot.address_number.trim().indexOf(this.searchTerm.trim()) > -1 || lot.line.trim().indexOf(this.searchTerm.trim()) > -1 || lot.street.trim().indexOf(this.searchTerm.trim()) > -1 || lot.city.trim().indexOf(this.searchTerm.trim()) > -1 || lot.npa == parseInt(this.searchTerm))
      })
    }
  }

  public addLot(lot) {
    this.newForm.addLot(lot);
    this.navCtrl.pop();
  }


}
