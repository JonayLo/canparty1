import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { AddNightclubPage } from "../add-nightclub/add-nightclub";
import { NightclubPage } from "../nightclub/nightclub";
import { AuthenticationPage } from "../authentication/authentication";
import { Storage } from "@ionic/storage";


@Component({
  selector: 'page-my-nightclubs',
  templateUrl: 'my-nightclubs.html'
})
export class MyNightclubsPage {
  items: FirebaseListObservable<any>;

  constructor(public navCtrl: NavController, private af: AngularFire, public storage: Storage,
              public toastCtrl: ToastController) {
    this.af.auth.subscribe(auth => {
      this.items = af.database.list('/nightclubs', {
        query: {
          orderByChild: 'user',
          equalTo: auth.uid
        }
      });
    });
  }

  addNightclubTapped() {
    this.navCtrl.push(AddNightclubPage);
  }

  nightclubTapped(nightclub_id) {
    this.navCtrl.push(NightclubPage, { nightclub_id: nightclub_id });
  }

  authenticationTapped() {
    this.navCtrl.push(AuthenticationPage);
  }

}
