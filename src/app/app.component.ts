import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar, Splashscreen } from 'ionic-native';
import { HomePage } from '../pages/home/home';
import { NightclubsPage } from "../pages/nightclubs/nightclubs";
import { FavPage } from "../pages/fav/fav";
import { MyNightclubsPage } from "../pages/my-nightclubs/my-nightclubs";
import { AngularFire } from "angularfire2";


@Component({
  templateUrl: 'app.html'
})
export class AppComponent {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = NightclubsPage;
  pages: Array<{title: string, component: any}>;

  constructor(public platform: Platform, private af: AngularFire) {
    this.initializeApp();

    this.pages = [
      { title: 'Home', component: HomePage},
      { title: 'Favourites Clubs', component: FavPage},
      { title: 'Nightclubs', component: NightclubsPage}
    ];

    this.af.auth.subscribe((auth) => {
      if(auth)
        this.pages.push({title: 'My Nightclubs', component: MyNightclubsPage});
    });
  }

  initializeApp() {
    this.platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      StatusBar.styleDefault();
      Splashscreen.hide();
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
  logout() {
    this.af.auth.logout();
    this.pages.pop();
  }
}
