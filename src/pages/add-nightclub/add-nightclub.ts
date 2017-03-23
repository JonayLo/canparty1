import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import { AngularFire, FirebaseListObservable } from 'angularfire2';



@Component({
  templateUrl: 'add-nightclub.html'
})
export class AddNightclubPage {
  private nightclub : FormGroup;
  private firebase;

  constructor( private formBuilder: FormBuilder, af:AngularFire ) {
    this.nightclub = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      location: ['', Validators.required],
      img: ['', Validators.required],
    });

    this.firebase = af.database.list('/nightclubs');
  }

  logForm(){
    // Get image from canvas
    let canvas = <HTMLCanvasElement>document.getElementById('image_preview');
    this.nightclub.controls['img'].setValue(canvas.toDataURL());

    this.firebase.push({
      "date" : "2017-1-1",
      "description" : this.nightclub.value.description,
      "img" : this.nightclub.value.img,
      "location" : this.nightclub.value.location,
      "name" : this.nightclub.value.name
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



  uploadImage(name, data) {
    let promise = new Promise((res,rej) => {
      let fileName = name + ".jpg";
      let uploadTask = firebase.storage().ref(`/nightclubs/${fileName}`).put(data);
      uploadTask.on('state_changed', function(snapshot) {
      }, function(error) {
        rej(error);
      }, function() {
        var downloadURL = uploadTask.snapshot.downloadURL;
        res(downloadURL);
      });
    });
    return promise;
  }

}
