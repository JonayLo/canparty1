import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {NavController} from "ionic-angular";


@Component({
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {
  private form : FormGroup;

  constructor(public af: AngularFire, private formBuilder: FormBuilder, public navCtrl: NavController) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    // this.af.auth.login();
    this.af.auth.login(this.form.value).then(() => {this.navCtrl.pop();});
  }

  logout() {
    this.af.auth.logout();
  }
}
