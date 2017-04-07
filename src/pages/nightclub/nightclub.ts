import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { AddNightclubPage } from "../add-nightclub/add-nightclub";
import { MapPage} from "../map/map";
import { Storage } from "@ionic/storage";


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

  constructor(public navCtrl: NavController, private navParams: NavParams, public af: AngularFire,
              public storage: Storage, public toastCtrl: ToastController) {
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

  isFavClub(club_id) {
    return new Promise(resolve => {
      this.storage.ready().then(() => {
        let bol;
        this.storage.get('fav' + club_id).then((val) => { bol = this.equal(val, club_id) ;
          resolve(bol)});
      });
    });
  }

  equal(club_id, val) {
    if (val == null) {
      return false;
    }
    if (val == club_id) {
      return true;
    } else {
      return false;
    }
  }

  toggleFav(event) {
    let nightclub_id = event.currentTarget.id;
    this.isFavClub(nightclub_id).then((val) => {
      if (val) {
        this.storage.ready().then(() => {
          this.storage.remove("fav" + nightclub_id);
          this.presentToast("Nightclub removed from favorites");
          return;
        });
      } else {
        this.storage.ready().then(() => {
          this.storage.set("fav" + nightclub_id, nightclub_id);
          this.presentToast("Nightclub added to favorites");
        });
      }
    });
  }

  presentToast(string) {
    let toast = this.toastCtrl.create({
      message: string,
      duration: 3000,
      position: 'middle'
    });
    toast.present();
  }
  showMap() {
    this.navCtrl.push(MapPage, {"nightclub_id" : this.nightclub_id});
  }

}
