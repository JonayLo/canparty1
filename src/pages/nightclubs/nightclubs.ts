import { Component } from '@angular/core';
import { NavController, NavParams, ToastController } from 'ionic-angular';
import { AngularFire, FirebaseListObservable } from 'angularfire2';
import {AddNightclubPage} from "../add-nightclub/add-nightclub";
import {NightclubPage} from "../nightclub/nightclub";
import {Storage} from "@ionic/storage";
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
  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFire, public storage:Storage, public toastCtrl: ToastController) {
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
    let bool;
      this.storage.ready().then(() => {
      this.storage.get('fav'+club_id).then((val) => { bool = this.equal(val, club_id)});  
    });
  }

  equal(club_id, val) {
    console.log(val +"   "+ club_id)
    if (val.toString() == club_id.toString()) {
      return true;
    }
    return false;
  }

  toggleFav(nightclub_id){
    if (this.isFavClub(nightclub_id)) {
       this.storage.ready().then(() => {
        this.storage.remove("fav"+nightclub_id);
        this.presentToast("Nightclub removed from favorites");
        return;
      });
    }
    this.storage.ready().then(() => {
        this.storage.set("fav"+nightclub_id, nightclub_id);
        this.presentToast("Nightclub added to favorites");
    });
  }

   presentToast(string) {
    let toast = this.toastCtrl.create({
      message: string,
      duration: 3000
    });
    toast.present();
  }
}
