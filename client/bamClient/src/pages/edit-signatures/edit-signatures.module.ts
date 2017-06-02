import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditSignaturesPage } from './edit-signatures';

@NgModule({
  declarations: [
    EditSignaturesPage,
  ],
  imports: [
    IonicPageModule.forChild(EditSignaturesPage),
  ],
  exports: [
    EditSignaturesPage
  ]
})
export class EditSignaturesPageModule {}
