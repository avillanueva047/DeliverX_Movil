import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { EnvService } from './env.service';
import { User } from '../models/user';
import { Delivery } from '../models/delivery';
import { Delivered } from '../models/delivered';
import { Geolocation } from '@ionic-native/geolocation/ngx';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn =  false;
  token:any;
  lat: number;
  lon: number;

  constructor(
    private http: HttpClient,
    private storage: NativeStorage,
    private env: EnvService,
    private geolocation: Geolocation
  ) { }

  login(email:String, password: String){
    return this.http.post(this.env.API_URL + 'auth/login',
      {email: email, password: password}
    ).pipe(
      tap(token => {
        this.storage.setItem('token', token)
        .then(
          () => {
            console.log('Token Stored');
          },
          error => console.error('Error storing item', error)
        );
        this.token = token;
        this.isLoggedIn = true;
        return token;
      }),
    );
  }

  register(fName: String, lName: String, email: String, password: String) {
    return this.http.post(this.env.API_URL + 'auth/register',
      {fName: fName, lName: lName, email: email, password: password}
    )
  }

  delivered(id: number, user_id: number) {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.lat = resp.coords.latitude;
      this.lon = resp.coords.longitude;
      return this.http.post(this.env.API_URL + 'auth/delivered',
        {id: id, user_id: user_id, latitude: this.lat, longitude: this.lon}
      ).subscribe()
    }).catch((error) => {
      console.log('Error getting location', error);
    });
  }

  reset(email: String) {
    return this.http.post(this.env.API_URL + 'auth/reset',
      {email: email}
    )
  }

  logout() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });

    return this.http.get(this.env.API_URL + 'auth/logout', { headers: headers })
    .pipe(
      tap(data => {
        this.storage.remove("token");
        this.isLoggedIn = false;
        delete this.token;
        return data;
      })
    )
  }

  user() {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });

    return this.http.get<User>(this.env.API_URL + 'auth/user', { headers: headers })
    .pipe(
      tap(user => {
        return user;
      })
    )
  }

  getDeliveries(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });

    return this.http.get<Delivery[]>(this.env.API_URL + 'auth/deliveries/' + id, {headers: headers})
    .pipe(
      tap(deliveries => {
        return deliveries;
      })
    )
  }

  getDelivered(id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    console.log(headers);
    return this.http.get<Delivered[]>(this.env.API_URL + 'auth/delivered/' + id, {headers: headers})
    .pipe(
      tap(delivered => {
        return delivered;
      })
    )
  }

  changePassword(password: String, new_password: String, repeat_password: String, id: number) {
    const headers = new HttpHeaders({
      'Authorization': this.token["token_type"]+" "+this.token["access_token"]
    });
    console.log(headers);
    return this.http.post(this.env.API_URL + 'auth/changePassword', {headers: headers})
  }

  getToken() {
    return this.storage.getItem('token').then(
      data => {
        this.token = data;
        if(this.token != null) {
          this.isLoggedIn=true;
        } else {
          this.isLoggedIn=false;
        }
      },
      error => {
        this.token = null;
        this.isLoggedIn=false;
      }
    );
  }

}
