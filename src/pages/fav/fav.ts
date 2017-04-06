import { Component } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { NavController, NavParams, LoadingController } from 'ionic-angular';
import {NightclubsPage} from "../nightclubs/nightclubs";
import {Storage} from "@ionic/storage";
import { AngularFire, FirebaseObjectObservable } from 'angularfire2';


@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html',
  providers: [NightclubsPage]
})
export class FavPage {
favs :FirebaseObjectObservable<any>;
favs2:Observable<any> [] = [];
  constructor(public loaderController: LoadingController, public nightclub: NightclubsPage, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public af: AngularFire) {
   
  }

  ionViewWillEnter(){
     let loader = this.loaderController.create({
        content: 'Accediendo a los datos. .',
        dismissOnPageChange: false,
      });
      loader.present();
   this.favs2 = this.getFavoritesClubs();
   loader.dismiss();
  }

  goToClubs() {
    this.navCtrl.push(NightclubsPage);
  }
  

  getFavoritesClubs() {
   let temp = [];
   this.storage.ready().then(() => {
        this.storage.forEach((value,key,index) =>{
         this.favs = (this.af.database.object('/nightclubs/' + value));
         temp.push(this.favs);
        });
     });
     return temp ;
  }
}

