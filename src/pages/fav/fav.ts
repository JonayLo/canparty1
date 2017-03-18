import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {NightclubsPage} from "../nightclubs/nightclubs";



@Component({
  selector: 'page-fav',
  templateUrl: 'fav.html'
})
export class FavPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {}

  goToClubs() {
    this.navCtrl.push(NightclubsPage);
  }
}
