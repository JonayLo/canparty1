import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from "angularfire2";
import { AddNightclubPage } from "../add-nightclub/add-nightclub";
import { NightclubPage } from "../nightclub/nightclub";
import { AuthenticationPage } from "../authentication/authentication";
import { Storage } from "@ionic/storage";
import { MapPage } from "../map/map";


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

  isFavClub(club_id) {
    return new Promise(resolve => {
      this.storage.ready().then(() => {
        let bol;
        this.storage.get('fav' + club_id).then((val) => {
          bol = this.equal(val, club_id);
          resolve(bol)
        });
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

  toggleFav(nightclub_id) {
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


  showMap(nightclub_id) {
    this.navCtrl.push(MapPage, {nightclub_id: nightclub_id});
  }
}
