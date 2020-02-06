import { Component, OnInit } from '@angular/core';
import { Delivered } from 'src/app/models/delivered';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-list',
  templateUrl: 'list.page.html',
  styleUrls: ['list.page.scss']
})
export class ListPage implements OnInit {
  /*
  private selectedItem: any;
  private icons = [
    'flask',
    'wifi',
    'beer',
    'football',
    'basketball',
    'paper-plane',
    'american-football',
    'boat',
    'bluetooth',
    'build'
  ];
  public items: Array<{ title: string; note: string; icon: string }> = [];
  constructor() {
    for (let i = 1; i < 11; i++) {
      this.items.push({
        title: 'Item ' + i,
        note: 'This is item #' + i,
        icon: this.icons[Math.floor(Math.random() * this.icons.length)]
      });
    }
  }
  */
  user : User;
  delivered: Delivered[];

  constructor(private authService: AuthService) {

  }

  ionViewWillEnter(){
    this.authService.user().subscribe(
      user => {
        this.user = user;
        this.authService.getDelivered(this.user.id).subscribe(
          delivered => {
            this.delivered = delivered;
          }
        );
      }
    );
  }



  ngOnInit() {
    
  }
  // add back when alpha.4 is out
  // navigate(item) {
  //   this.router.navigate(['/list', JSON.stringify(item)]);
  // }
}
