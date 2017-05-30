import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewStatePage } from './new-state';

@NgModule({
  declarations: [
    NewStatePage,
  ],
  imports: [
    IonicPageModule.forChild(NewStatePage),
  ],
  exports: [
    NewStatePage
  ]
})
export class NewStatePageModule {}
