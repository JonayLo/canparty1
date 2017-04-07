import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { AppComponent } from './app.component';
import { HomePage} from '../pages/home/home';
import { NightclubsPage } from "../pages/nightclubs/nightclubs";
import { NightclubPage } from "../pages/nightclub/nightclub";
import { EventsPage } from "../pages/events/events";
import { FavPage } from "../pages/fav/fav";
import { IonicStorageModule } from "@ionic/storage"
import { BrowserModule } from '@angular/platform-browser';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { AddNightclubPage, GalleryModal } from "../pages/add-nightclub/add-nightclub";
import { AuthenticationPage } from "../pages/authentication/authentication";
import { IonicImageViewerModule } from 'ionic-img-viewer';
import { MapPage } from '../pages/map/map';
import { MyNightclubsPage } from "../pages/my-nightclubs/my-nightclubs";

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
    GalleryModal,
    MyNightclubsPage,
    MapPage
  ],
  imports: [
    IonicModule.forRoot(AppComponent),
    IonicStorageModule.forRoot(),
    BrowserModule,
    IonicImageViewerModule,
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
    GalleryModal,
    MyNightclubsPage,
    MapPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
