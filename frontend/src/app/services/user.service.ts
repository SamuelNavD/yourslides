import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { URL_SERVICES } from '../config/config';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;

  constructor(
    public http: HttpClient,
    public router: Router
  ) {
    if ( localStorage.getItem('token') ) this.token = localStorage.getItem('token');
    else this.token = '';
  }

  loginUser( user: User, remember: boolean = false ) {
    let url = URL_SERVICES + '/user/signIn';
    
    return this.http.post( url, user )
                    .pipe(map( (res: any) => {
                      localStorage.setItem('token', res.token);
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
}
