import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
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
  constructor(public navCtrl: NavController, public navParams: NavParams, af:AngularFire) {
    this.items = af.database.list('/nightclubs');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad NightclubsPage');
  }

}
