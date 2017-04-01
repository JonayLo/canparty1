import { Component } from '@angular/core';
import { AngularFire } from 'angularfire2';
import {Validators, FormBuilder, FormGroup } from '@angular/forms';
import {NavController} from "ionic-angular";
import { AlertController } from 'ionic-angular';


@Component({
  templateUrl: 'authentication.html'
})
export class AuthenticationPage {
  private form : FormGroup;

  constructor(public af: AngularFire, private formBuilder: FormBuilder, public navCtrl: NavController, public alertCtrl: AlertController) {
    this.form = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  login() {
    this.af.auth.login(this.form.value)
      .then(() => {this.navCtrl.pop();
    })
      .catch((error) => { this.errorAlert(error);
      });
  }

  logout() {
    this.af.auth.logout();
  }

  signup() {
    if (this.form.controls['password'].value.length < 6) {
      let alert = this.alertCtrl.create({
        title: 'Weak password',
        subTitle: 'Password should be at least 6 characters',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    this.af.auth.createUser(this.form.value)
      .then((userRecord) => {
        this.af.database.object('/users/' + userRecord.uid +'/0').set(0).then(() => {this.navCtrl.pop();});
      })
      .catch((error) => { this.errorAlert(error);
      });
  }

  errorAlert(error){
    let alert = this.alertCtrl.create({
      title: 'Error',
      message: error.message,
      buttons: ['OK']
    });
    alert.present();
  }

}
