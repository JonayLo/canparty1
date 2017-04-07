import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import {FirebaseListObservable, AngularFire} from 'angularfire2';
import {AuthenticationPage} from '../authentication/authentication';
import {ArticlePage} from '../article/article';
/*
  Generated class for the Home page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  articles: FirebaseListObservable<any[]>;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af: AngularFire) {
    this.articles =  this.af.database.list('/articles', {
       query:{
         limitToLast: 10      
        }
     });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad HomePage');
  }

  logIn() {
    this.navCtrl.push(AuthenticationPage);
  }
  
  showArticle(item) {
     this.navCtrl.push(ArticlePage, { article: item});
  }

}
