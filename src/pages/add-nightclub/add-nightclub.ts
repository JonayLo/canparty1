import { Component } from '@angular/core';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  templateUrl: 'add-nightclub.html'
})
export class AddNightclubPage {
  private nightclub : FormGroup;

  constructor( private formBuilder: FormBuilder ) {
    this.nightclub = this.formBuilder.group({
      title: ['', Validators.required],
      description: [''],
      image: [''],
    });
  }
  logForm(){
    console.log(this.nightclub.value);
  }

  renderImage(evt) {
    // Always return a array of files but we only permit one
    let file = evt.target.files[0];

    // Only process image files.
    if (!file.type.match('image.*')) {
      return;
    }

    let reader = new FileReader();

    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        // Render thumbnail.
        let span = ['<img class="thumb" src="', e.target.result,
          '" title="', encodeURI(theFile.name), '"/>'].join('');
        document.getElementById('image_preview').innerHTML = span;
      };
    })(file);

    // Read in the image file as a data URL.
    reader.readAsDataURL(file);
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
