import { Component } from '@angular/core';
import {Observable} from "rxjs/Observable";
import { NavController, NavParams } from 'ionic-angular';
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
favs2 = [];
  constructor(public nightclub: NightclubsPage, public navCtrl: NavController, public navParams: NavParams, public storage: Storage, public af: AngularFire) {
   
  }

  ionViewDidEnter(){
   this.favs2 = this.getFavoritesClubs();
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

