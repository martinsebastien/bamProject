import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ShowFormPage } from './show-form';

@NgModule({
  declarations: [
    ShowFormPage,
  ],
  imports: [
    IonicPageModule.forChild(ShowFormPage),
  ],
  exports: [
    ShowFormPage
  ]
})
export class ShowFormPageModule {}
