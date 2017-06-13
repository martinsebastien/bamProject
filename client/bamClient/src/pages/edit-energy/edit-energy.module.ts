import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditEnergyPage } from './edit-energy';

@NgModule({
  declarations: [
    EditEnergyPage,
  ],
  imports: [
    IonicPageModule.forChild(EditEnergyPage),
  ],
  exports: [
    EditEnergyPage
  ]
})
export class EditEnergyPageModule {}
