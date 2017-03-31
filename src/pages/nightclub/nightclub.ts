import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';
import {AddNightclubPage} from "../add-nightclub/add-nightclub";

@Component({
  selector: 'page-nightclub',
  templateUrl: 'nightclub.html'
})
export class NightclubPage {
  item: FirebaseObjectObservable<any>;
  private nightclub_id;

  constructor(public navCtrl: NavController, private navParams: NavParams, public af: AngularFire) {
    this.nightclub_id = this.navParams.get('nightclub_id');
    this.item = af.database.object('/nightclubs/' + this.nightclub_id);
  }

  edit(){
    this.navCtrl.push(AddNightclubPage, { nightclub_id: this.nightclub_id });
  }
}
