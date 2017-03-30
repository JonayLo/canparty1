import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';

@Component({
  selector: 'page-nightclub',
  templateUrl: 'nightclub.html'
})
export class NightclubPage {
  item: FirebaseObjectObservable<any>;

  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.item = af.database.object('/nightclubs/' + this.navParams.get('nightclub_id'));
  }

}
