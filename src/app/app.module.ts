import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { HomePage} from '../pages/home/home';
import {NightclubsPage} from "../pages/nightclubs/nightclubs";
import {EventsPage} from "../pages/events/events";
import {FavPage} from "../pages/fav/fav";

import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule } from 'angularfire2';

export const firebaseConfig = {
  apiKey: 'AIzaSyB_LSza8qqhf9_DoJortBhvLqqkTNNQ4LE',
  authDomain: 'canparty2.firebaseapp.com',
  databaseURL: 'https://canparty2.firebaseio.com',
  storageBucket: 'canparty2.appspot.com',
  messagingSenderId: '79348211035'
};

@NgModule({
  declarations: [
    AppComponent,
    HomePage,
    NightclubsPage,
    EventsPage,
    FavPage
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    BrowserModule,
    AngularFireModule.initializeApp(firebaseConfig)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    AppComponent,
    HomePage,
    NightclubsPage,
    EventsPage,
    FavPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
