import { Component } from '@angular/core';
import { NavController, LoadingController, ToastController } from 'ionic-angular';
import { NightclubsPage } from "../nightclubs/nightclubs";
import { NightclubPage } from "../nightclub/nightclub";
import { Storage } from "@ionic/storage";
import { AngularFire } from 'angularfire2';
import { MapPage} from "../map/map";


@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
  providers: [NightclubsPage]
})
export class FavPage {
  favs = [];
  private length = 0;

  constructor(public loaderController: LoadingController, public navCtrl: NavController,
              public storage: Storage, public af: AngularFire, public toastCtrl: ToastController) {
    let loader = this.loaderController.create({
      content: 'Accediendo a los datos. .',
      dismissOnPageChange: false,
    });
    loader.present();
    this.favs = this.getFavoritesClubs();
    loader.dismiss();
  }

  goToClubs() {
    this.navCtrl.setRoot(NightclubsPage);
  }


  getFavoritesClubs() {
    let temp = [];
    this.storage.ready().then(() => {
      this.storage.forEach((value) =>{
        let aux = (this.af.database.object('/nightclubs/' + value));
        temp.push(aux);
        this.length++;
      });
    });
    return temp;
  }

  nightclubTapped(event) {
    let nightclub_id = event.currentTarget;
    this.navCtrl.push(NightclubPage, { nightclub_id: nightclub_id.className });
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
    let nightclub_id = event.currentTarget.className;
    this.isFavClub(nightclub_id).then((val) => {
      if (val) {
        this.storage.ready().then(() => {
          this.storage.remove("fav" + nightclub_id);
          this.presentToast("Nightclub removed from favorites");
          document.getElementsByClassName(nightclub_id)[0].remove();
          this.length--;
          if(this.length == 0){
            this.favs = [];
          }
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
  showMap(event) {
    let nightclub_id = event.currentTarget.id;

    this.navCtrl.push(MapPage, {"nightclub_id": nightclub_id});
  }
}
