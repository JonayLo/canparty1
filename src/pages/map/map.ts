import { Component, ViewChild, ElementRef } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AngularFire } from 'angularfire2';


declare let google;

@Component({
  selector: 'page-map',
  templateUrl: 'map.html'
})
export class MapPage {

  @ViewChild('map') mapElement: ElementRef;
  map: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public af:AngularFire) {}

  ionViewDidLoad(){
    let nightclub_id = this.navParams.get('nightclub_id');

    this.af.database.object('/nightclubs/' + nightclub_id).take(1).subscribe(snapshot => {
      this.loadMap(new Number(snapshot.lat), new Number(snapshot.lng));
    });
  }

  loadMap(lat, lng){

    let latLng = new google.maps.LatLng(lat, lng);

    let mapOptions = {
      center: latLng,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);
    let marker = new google.maps.Marker({ position: latLng, map: this.map, title:"Daw Class" });
  }
}
