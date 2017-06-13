import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { ItemsProvider } from '../../providers/items/items';
import { EditRoomPage } from '../edit-room/edit-room';

@IonicPage()
@Component({
  selector: 'page-edit-item',
  templateUrl: 'edit-item.html',
})
export class EditItemPage {
  item: any;
  itemChange = <any>{};  
  /*public base64Image: string;*/

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public itemsProvider: ItemsProvider,
  ) {}

  ionViewDidLoad() {
    this.item = this.navParams.data;
    this.itemChange.id = this.item.id;
  }

  submitItem() {
    this.itemsProvider.edit(this.itemChange).subscribe(items => {
      this.itemsProvider.items = items
    });
    this.navCtrl.pop();
  }
  
  // Available on smartphone. Don't forget to activate it before generate the application
  /*takePicture(){
    Camera.getPicture({
        destinationType: Camera.DestinationType.DATA_URL,
        targetWidth: 1000,
        targetHeight: 1000
    }).then((imageData) => {
      // imageData is a base64 encoded string
        this.base64Image = "data:image/jpeg;base64," + imageData;
    }, (err) => {
        console.log(err);
    });
  }*/

}
