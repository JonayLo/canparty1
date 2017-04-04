import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { HomePage} from '../pages/home/home';
import {NightclubsPage} from "../pages/nightclubs/nightclubs";
import {NightclubPage} from "../pages/nightclub/nightclub";
import {EventsPage} from "../pages/events/events";
import {FavPage} from "../pages/fav/fav";

import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import {AddNightclubPage, GalleryModal} from "../pages/add-nightclub/add-nightclub";
import {AuthenticationPage} from "../pages/authentication/authentication";
import { IonicImageViewerModule } from 'ionic-img-viewer';

export const firebaseConfig = {
  apiKey: 'AIzaSyB_LSza8qqhf9_DoJortBhvLqqkTNNQ4LE',
  authDomain: 'canparty2.firebaseapp.com',
  databaseURL: 'https://canparty2.firebaseio.com',
  storageBucket: 'canparty2.appspot.com',
  messagingSenderId: '79348211035'
};

const firebaseAuthConfig = {
  provider: AuthProviders.Custom,
  method: AuthMethods.Password
};

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    NightclubsPage,
    NightclubPage,
    EventsPage,
    FavPage,
    AddNightclubPage,
    AuthenticationPage,
    GalleryModal
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireModule.initializeApp(firebaseConfig, firebaseAuthConfig),
    IonicImageViewerModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage,
    NightclubsPage,
    NightclubPage,
    EventsPage,
    FavPage,
    AddNightclubPage,
    AuthenticationPage,
    GalleryModal
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
