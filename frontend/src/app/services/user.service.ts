import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { URL_SERVICES, SECRET_KEY } from '../config/config';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;
  user: User;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
    } else {
      this.token = '';
    }
  }

  loginUser( user: User, remember: boolean = false ) {
    let url = URL_SERVICES + '/user/signIn';
    
    return this.http.post( url, user )
                    .pipe(map( (res: any) => {
                      localStorage.setItem('token', res.token);
                      localStorage.setItem('un', CryptoJS.AES.encrypt(res.user.name, SECRET_KEY).toString());
                      localStorage.setItem('us', CryptoJS.AES.encrypt(res.user.surname, SECRET_KEY).toString());
                      localStorage.setItem('ue', CryptoJS.AES.encrypt(res.user.email, SECRET_KEY).toString());
                      localStorage.setItem('ua', CryptoJS.AES.encrypt(res.user.avatar, SECRET_KEY).toString());
                      localStorage.setItem('ui', CryptoJS.AES.encrypt(res.user._id, SECRET_KEY).toString());
                      this.token = res.token;
                      if ( remember ) localStorage.setItem('email', user.email);
                      else localStorage.removeItem('email');
                    }));
  }

  createUser( user: User ) {
    let url = URL_SERVICES + '/user/signUp';
    
    return this.http.post( url, user );
  }

  isLogged() {
    return ( this.token.length > 10 ) ? true : false;
  }

  logOut() {
    this.token = '';
    localStorage.removeItem('token');
    this.router.navigate(['/acceso/login']);
  }

  decryptLocalUserInfo() {
    if (this.user == null) {
      this.user = new User(
        CryptoJS.AES.decrypt(localStorage.getItem('ue'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
        ':)',
        CryptoJS.AES.decrypt(localStorage.getItem('un'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
        CryptoJS.AES.decrypt(localStorage.getItem('us'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
        CryptoJS.AES.decrypt(localStorage.getItem('ua'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
        CryptoJS.AES.decrypt(localStorage.getItem('ui'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
      );
    }

    return this.user;
  }

}
