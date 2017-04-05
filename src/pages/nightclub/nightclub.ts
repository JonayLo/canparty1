import { Component, Directive } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable, FirebaseListObservable} from 'angularfire2';
import {AddNightclubPage} from "../add-nightclub/add-nightclub";


@Component({
  selector: 'page-nightclub',
  templateUrl: 'nightclub.html',
})


export class NightclubPage {
  item: FirebaseObjectObservable<any>;
  gallery: FirebaseListObservable<any>;
  show_gallery = false;
  gallery_exists = false;
  private nightclub_id;

  constructor(public navCtrl: NavController, private navParams: NavParams, public af: AngularFire) {
    this.nightclub_id = this.navParams.get('nightclub_id');
    this.item = af.database.object('/nightclubs/' + this.nightclub_id);
    this.gallery = af.database.list('/nightclubs/' + this.nightclub_id + '/gallery');
    af.database.object('/nightclubs/' + this.nightclub_id + '/gallery/0').subscribe((obj) => {
      this.gallery_exists = obj.$exists();
    });
  }

  edit(){
    this.navCtrl.push(AddNightclubPage, { nightclub_id: this.nightclub_id });
  }

  showGallery(){
    this.show_gallery = true;
  }
}
