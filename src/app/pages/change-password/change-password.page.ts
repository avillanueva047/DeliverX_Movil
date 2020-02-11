import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from "@ionic/angular";
import { NgForm } from '@angular/forms';
import { AlertService } from 'src/app/services/alert.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.page.html',
  styleUrls: ['./change-password.page.scss'],
})
export class ChangePasswordPage implements OnInit {

  constructor(
    private authService: AuthService,
    private alertService: AlertService,
    private navCtrl: NavController
  ) { }

  ngOnInit() {
  }

  changePassword(form: NgForm){
    this.authService.changePassword(form.value.password, form.value.new_password, form.value.repeat_password).subscribe(
      data => {
        this.alertService.presentToast("Password Changed Successfully");
      },
      error => {
        console.log(error);
      },
      () => {
        this.navCtrl.navigateRoot('/dashboard');
      }
    );
  }
}
