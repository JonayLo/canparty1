import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage} from '../pages/home/home';
import {NightclubsPage} from "../pages/nightclubs/nightclubs";
import {EventsPage} from "../pages/events/events";
import {FavPage} from "../pages/fav/fav";

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    NightclubsPage,
    EventsPage,
    FavPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    NightclubsPage,
    EventsPage,
    FavPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}]
})
export class AppModule {}
