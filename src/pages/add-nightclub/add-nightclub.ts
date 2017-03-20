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
    console.log(this.nightclub.value)
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
