import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.page.html',
  styleUrls: ['./reset.page.scss'],
})
export class ResetPage implements OnInit {

  constructor(
    private modalController: ModalController,
    private authService: AuthService,
    private navCtrl: NavController,
    private alertService: AlertService
  ) { }

  ngOnInit() {
  }

  dismissReset(){
    this.modalController.dismiss();
  }

  reset(form: NgForm){
    this.authService.reset(form.value.email).subscribe(
      data => {
        this.alertService.presentToast("Email Sended Correctly");
      },
      error => {
        console.log(error);
      },
      () => {
        this.dismissReset();
      }
    );
  }
}
