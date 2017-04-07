import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {AngularFire, FirebaseObjectObservable} from 'angularfire2';

/*
  Generated class for the Article page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-article',
  templateUrl: 'article.html'
})
export class ArticlePage {
  article: FirebaseObjectObservable<any>;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.article = this.navParams.get('article');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ArticlePage');
  }

}
