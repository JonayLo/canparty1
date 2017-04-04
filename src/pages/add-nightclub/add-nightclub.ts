import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFire } from 'angularfire2';
import {NavController, NavParams, AlertController, ViewController, ModalController} from 'ionic-angular';
import {isUndefined} from "ionic-angular/util/util";
import 'rxjs/add/operator/take'


@Component({
  templateUrl: 'add-nightclub.html'
})
export class AddNightclubPage {
  private nightclub : FormGroup;
  private firebase;
  private auth;
  private nightclub_id;
  edit;
  private key;
  private gallery: any[];

  constructor( private formBuilder: FormBuilder, public af:AngularFire, public navCtrl: NavController,
               private navParams: NavParams, public alertCtrl: AlertController, public modalCtrl: ModalController) {
    this.firebase = af.database;
    this.af.auth.subscribe(auth => {this.auth = auth.uid;});

    this.nightclub_id = this.navParams.get('nightclub_id');
    if(isUndefined(this.nightclub_id)){
      this.edit = false;
      this.nightclub = this.formBuilder.group({
        name: ['', Validators.required],
        description: ['', Validators.required],
        location: ['', Validators.required],
        img: ['', Validators.required],
      });
    } else {
      this.edit = true;
      this.firebase.object('/nightclubs/' + this.nightclub_id).take(1).subscribe(snapshot => {
        this.nightclub = this.formBuilder.group({
          name: [snapshot.name, Validators.required],
          description: [snapshot.description, Validators.required],
          location: [snapshot.location, Validators.required],
          img: [snapshot.img, Validators.required],
        });
        this.key = snapshot.key;
        this.renderImageFromURL();
      });
    }
  }

  logForm(){
    if (!this.edit){
      this.createNightclub();
    } else {
      this.editNightclub();
    }
  }

  createNightclub(){
    // Get image from canvas
    let canvas = <HTMLCanvasElement>document.getElementById('image_preview');
    this.nightclub.controls['img'].setValue(canvas.toDataURL());

    this.firebase.list('/nightclubs').push({
      "date" : "2017-1-1",
      "description" : this.nightclub.value.description,
      "img" : this.nightclub.value.img,
      "location" : this.nightclub.value.location,
      "name" : this.nightclub.value.name,
      "user" : this.auth
    }).then((item) => {
      this.firebase.object('/nightclubs/'+item.key).update({
        "key" : item.key
      });

      // Update gallery
      if(!isUndefined(this.gallery)){
        this.firebase.object('/nightclubs/' + item.key + '/gallery').set(this.gallery);
      }

      // Update list of user nightclubs
      let url = '/users/' + this.auth;
      this.firebase.object(url+'/0').take(1).subscribe(snapshot => {
        snapshot.$value++;
        this.firebase.object(url + '/' + snapshot.$value).set(item.key);
        this.firebase.object(url+'/0').set(snapshot.$value);
      });
      this.navCtrl.pop();
    });

    this.nightclub.controls['img'].setValue("");
  }

  editNightclub(){
    // Get image from canvas
    let canvas = <HTMLCanvasElement>document.getElementById('image_preview');
    this.nightclub.controls['img'].setValue(canvas.toDataURL());

    this.firebase.object('/nightclubs/' + this.nightclub_id).update({
      "date" : "2017-1-1",
      "description" : this.nightclub.value.description,
      "img" : this.nightclub.value.img,
      "location" : this.nightclub.value.location,
      "name" : this.nightclub.value.name,
    }).then(() => {

      // Update gallery
      if(!isUndefined(this.gallery)){
        this.firebase.object('/nightclubs/' + this.key + '/gallery').set(this.gallery);
      }

      this.navCtrl.pop();
    });

    this.nightclub.controls['img'].setValue("");
  }

  removeNightclub() {
    let confirm = this.alertCtrl.create({
      title: 'Delete this nightclub?',
      message: 'You will not be able to recover it once deleted.',
      buttons: [
        {
          text: 'Cancel',
        },
        {
          text: 'Remove',
          handler: () => {
            this.firebase.object('/nightclubs/' + this.nightclub_id).remove();
            this.navCtrl.popToRoot();
          }
        }
      ]
    });
    confirm.present();
  }

  openGallery() {
    let modal = this.modalCtrl.create(GalleryModal, {"nightclub_id": this.nightclub_id});
    modal.onDidDismiss(data => {
      this.gallery = data;
    });
    modal.present();
  }

  renderImage(evt) {
    // Always return a array of files but we only permit one.
    let file = evt.target.files[0];

    // Only process image files.
    if (isUndefined(file) || !file.type.match('image.*')) {
      return;
    }

    let reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render canvas.
        let img = document.createElement('img');
        img.src = e.target.result;
        img.onload = function () {
          let canvas = <HTMLCanvasElement>document.getElementById('image_preview');
          let ctx = canvas.getContext('2d');
          ctx.drawImage(img,0,0,294,205);
        };
      };
    })(file);

    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
    this.nightclub.controls['img'].setValue("NO IMPORTANT!");
  }

  renderImageFromURL(){
    let img = document.createElement('img');
    img.src = this.nightclub.controls['img'].value;
    img.onload = function () {
      let canvas = <HTMLCanvasElement>document.getElementById('image_preview');
      let ctx = canvas.getContext('2d');
      ctx.drawImage(img,0,0,294,205);
    };
  }
}


@Component({
  template: `
    <ion-header>
      <ion-navbar>
        <ion-row>
          <ion-title>Gallery</ion-title>
          <button ion-button icon-only (click)="file.click()">
            <ion-icon name="image"></ion-icon>
          </button>
          <button ion-button icon-only (click)="closeGallery()">
            <ion-icon name="close"></ion-icon>
          </button>
        </ion-row>
      </ion-navbar>
    </ion-header>

    <ion-content padding>
      <input type="file" #file (change)='renderImage($event)' hidden multiple>
      <div id="image-list" center text-center></div>
    </ion-content>
`
})
export class GalleryModal {
  private nightclub_id;

  constructor(private nav:NavController, private viewCtrl:ViewController, private af:AngularFire,
              private navParams: NavParams) {
    this.nightclub_id = this.navParams.get('nightclub_id');

    af.database.object('/nightclubs/' + this.nightclub_id + '/gallery/0').take(1).subscribe((obj) => {
      if(obj.$exists()){
        let gallery = af.database.list('/nightclubs/' + this.nightclub_id + '/gallery');
        gallery.take(1).subscribe(items => {
          items.forEach(item => { this.renderImageFromURL(item) });
        });
      }
    });
  }

  closeGallery(){
    let images = [];
    for(let i = 0; i < document.getElementsByClassName("image_preview").length; i++){
      let canvas = <HTMLCanvasElement>document.getElementsByClassName("image_preview")[i];
      images.push(canvas.toDataURL());
    }
    this.viewCtrl.dismiss(images);
  }

  renderImage(evt) {
    let files = evt.target.files; // FileList object

    // Loop through the FileList and render image files as thumbnails.
    for (let i = 0, f; f = files[i]; i++) {

      // Only process image files.
      if (!f.type.match('image.*')) {
        continue;
      }

      let reader = new FileReader();

      // Closure to capture the file information.
      reader.onload = (function(theFile) {
        return function(e) {
          // Render canvas.
          let img = document.createElement('img');
          img.src = e.target.result;
          img.onload = function () {
            let canv = document.createElement('canvas');
            canv.onclick = function() { this.parentNode.removeChild(this) };
            canv.className = 'image_preview';
            canv.height = 205;
            canv.width = 294;
            document.getElementById("image-list").appendChild(canv);
            let ctx = canv.getContext('2d');
            ctx.drawImage(img,0,0,294,205);
          };
        };
      })(f);

      // Read in the image file as a data URL.
      reader.readAsDataURL(f);
    }
  }

  renderImageFromURL(item){
    let img = document.createElement('img');
    img.src = item.$value;
    img.onload = function () {
      let canv = document.createElement('canvas');
      canv.onclick = function() { this.parentNode.removeChild(this) };
      canv.className = 'image_preview';
      canv.height = 205;
      canv.width = 294;
      document.getElementById("image-list").appendChild(canv);
      let ctx = canv.getContext('2d');
      ctx.drawImage(img,0,0,294,205);
    };
  }
}
