import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { HttpModule } from '@angular/http';
import { LOCALE_ID } from '@angular/core';
import { IonicImageViewerModule } from 'ionic-img-viewer';

import { HttpService } from '../services/http.service';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { ShowFormPage } from '../pages/show-form/show-form';
import { ItemGalleryPage } from '../pages/item-gallery/item-gallery';
import { NewStatePage } from '../pages/new-state/new-state';
import { SearchUserPage } from '../pages/search-user/search-user';

import { FormsProvider } from '../providers/forms/forms';
import { SafeHtmlPipe } from '../pipes/safe-html/safe-html';
import { SafeUrlPipe } from '../pipes/safe-url/safe-url';
import { NewFormProvider } from '../providers/new-form/new-form';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ShowFormPage,
    ItemGalleryPage,
    NewStatePage,
    SearchUserPage,
    SafeHtmlPipe,
    SafeHtmlPipe,
    SafeUrlPipe,
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicImageViewerModule,
    HttpModule,
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ShowFormPage,
    ItemGalleryPage,
    NewStatePage,
    SearchUserPage,
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    {provide: LOCALE_ID, useValue: "fr-FR"},
    FormsProvider,
    HttpService,
    NewFormProvider,
  ]
})
export class AppModule {}
