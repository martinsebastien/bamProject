import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the ItemGalleryPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-item-gallery',
  templateUrl: 'item-gallery.html',
})
export class ItemGalleryPage {

  public pictures = [];

  constructor(
    public navCtrl: NavController, 
    public params: NavParams,
    ) {
  }

  ionViewDidLoad() {
    console.log(this.params.data)
    this.pictures = this.params.data;
    console.log(this.pictures)
  }

}
