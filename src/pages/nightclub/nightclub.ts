import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {AddNightclubPage} from "../add-nightclub/add-nightclub";

@Component({
  selector: 'page-nightclub',
  templateUrl: 'nightclub.html'
})
export class NightclubPage {
  item: FirebaseObjectObservable<any>;
  gallery: FirebaseListObservable<any>;
  show_gallery = false;
  private nightclub_id;

  constructor(public navCtrl: NavController, private navParams: NavParams, public af: AngularFire) {
    this.nightclub_id = this.navParams.get('nightclub_id');
    this.item = af.database.object('/nightclubs/' + this.nightclub_id);
    this.gallery = af.database.list('/nightclubs/' + this.nightclub_id + '/gallery');
  }

  edit(){
    this.navCtrl.push(AddNightclubPage, { nightclub_id: this.nightclub_id });
  }

  showGallery(){
    this.show_gallery = true;
  }
}
