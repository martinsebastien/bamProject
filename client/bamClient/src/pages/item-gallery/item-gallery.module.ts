import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ItemGalleryPage } from './item-gallery';

@NgModule({
  declarations: [
    ItemGalleryPage,
  ],
  imports: [
    IonicPageModule.forChild(ItemGalleryPage),
  ],
  exports: [
    ItemGalleryPage
  ]
})
export class ItemGalleryPageModule {}
