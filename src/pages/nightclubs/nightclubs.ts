import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {AddNightclubPage} from "../add-nightclub/add-nightclub";
import {NightclubPage} from "../nightclub/nightclub";
import {AuthenticationPage} from "../authentication/authentication";
/*
  Generated class for the Nightclubs page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-nightclubs',
  templateUrl: 'nightclubs.html'
})
export class NightclubsPage {
  items: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFire) {
    this.items = af.database.list('/nightclubs');
  }

  addNightclubTapped() {
    this.navCtrl.push(AddNightclubPage);
  }

  nightclubTapped(nightclub_id) {
    this.navCtrl.push(NightclubPage, { nightclub_id: nightclub_id });
  }

  authenticationTapped(nightclub_id) {
    this.navCtrl.push(AuthenticationPage);
  }
}
