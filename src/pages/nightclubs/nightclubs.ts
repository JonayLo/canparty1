import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import { AddNightclubPage } from "../add-nightclub/add-nightclub";
import { NightclubPage } from "../nightclub/nightclub";
import { Storage } from "@ionic/storage";
import { Geolocation, GoogleMapsEvent, GoogleMapsLatLng, GoogleMap } from 'ionic-native';
import { AuthenticationPage } from "../authentication/authentication";
import { MapPage } from  "../map/map";

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
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire,
    public storage: Storage, public toastCtrl: ToastController) {
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

  getItems(event){
    if(event.target.value == "") {
      this.items = this.af.database.list('/nightclubs');
      return;
    }

    this.items = this.af.database.list('/nightclubs', {
      query: {
        orderByChild: 'name',
        equalTo: event.target.value
      }
    });
  }
}
