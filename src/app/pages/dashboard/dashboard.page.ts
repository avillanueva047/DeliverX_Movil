import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';
import { User } from 'src/app/models/user';
import { Delivery } from 'src/app/models/delivery';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  user : User;
  deliveries : Delivery[];

  constructor(private menu: MenuController, private authService: AuthService) {
    this.menu.enable(true);
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.authService.user().subscribe(
      user => {
        this.user = user;
        this.authService.getDeliveries(this.user.id).subscribe(
          deliveries => {
            this.deliveries = deliveries;
          }
        );
      }
    );
  }

  markAsDelivered(id:number, index: number){
    this.deliveries.splice(index, 1);
    this.delivered(id, this.user.id)
  }

  delivered(id: number, user_id:number){
    this.authService.delivered(id, user_id);
  }
}
