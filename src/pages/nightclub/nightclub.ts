import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

@Component({
  selector: 'page-nightclub',
  templateUrl: 'nightclub.html'
})
export class NightclubPage {
  item: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, af: AngularFire) {
    this.item = af.database.object('/nightclubs/0'); //mirando el primer objeto
  }

}
