import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchLotPage } from './search-lot';

@NgModule({
  declarations: [
    SearchLotPage,
  ],
  imports: [
    IonicPageModule.forChild(SearchLotPage),
  ],
  exports: [
    SearchLotPage
  ]
})
export class SearchLotPageModule {}
