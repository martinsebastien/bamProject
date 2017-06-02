import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompleteFormPage } from './complete-form';

@NgModule({
  declarations: [
    CompleteFormPage,
  ],
  imports: [
    IonicPageModule.forChild(CompleteFormPage),
  ],
  exports: [
    CompleteFormPage
  ]
})
export class CompleteFormPageModule {}
