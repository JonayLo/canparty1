import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFire, FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import {NavController} from "ionic-angular";



@Component({
  templateUrl: 'add-nightclub.html'
})
export class AddNightclubPage {
  private nightclub : FormGroup;
  private firebase;

  constructor( private formBuilder: FormBuilder, af:AngularFire, public navCtrl: NavController) {
    this.nightclub = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      img: ['', Validators.required],
    });

    this.firebase = af.database;
  }

  logForm(){
    // Get image from canvas
    let canvas = <HTMLCanvasElement>document.getElementById('image_preview');
    this.nightclub.controls['img'].setValue(canvas.toDataURL());

    this.firebase.list('/nightclubs').push({
      "date" : "2017-1-1",
      "description" : this.nightclub.value.description,
      "img" : this.nightclub.value.img,
      "location" : this.nightclub.value.location,
      "name" : this.nightclub.value.name
    }).then((item) => {
      this.firebase.object('/nightclubs/'+item.key).update({
        "key" : item.key
      }).then(() => { this.navCtrl.pop(); });
    });
  }

  renderImage(evt) {
    // Always return a array of files but we only permit one.
    let file = evt.target.files[0];

    // Only process image files.
    if (!file.type.match('image.*')) {
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
}
