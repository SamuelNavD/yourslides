import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { User } from '../models/user';
import { URL_SERVICES, SECRET_KEY } from '../config/config';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { UploadService } from './upload.service';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  token: string;
  user: User;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _uploadService: UploadService
  ) {
    if ( localStorage.getItem('token') ) {
      this.token = localStorage.getItem('token');
      this.user = this.decryptLocalUserInfo();
    } else {
      this.token = '';
      this.user = null;
    }
  }

  loginUser( user: User, remember: boolean = false ) {
    let url = URL_SERVICES + '/user/signIn';
    
    return this.http.post( url, user )
                    .pipe(map( (res: any) => {
                      this.saveLocalStorage(res.user, res.token);
                      if ( remember ) localStorage.setItem('email', user.email);
                      else localStorage.removeItem('email');
                    }));
  }

  createUser( user: User ) {
    let url = URL_SERVICES + '/user/signUp';
    
    return this.http.post( url, user )
            .pipe(map( (res: any) => {
              this.saveLocalStorage(res.user, res.token);
            }));
  }

  isLogged() {
    return ( this.token.length > 10 ) ? true : false;
  }

  logOut() {
    this.token = '';
    this.user = null;
    localStorage.removeItem('token');
    localStorage.removeItem('ue');
    localStorage.removeItem('un');
    localStorage.removeItem('us');
    localStorage.removeItem('ua');
    localStorage.removeItem('ui');
    this.router.navigate(['/acceso/login']);
  }

  updateUser( user: User ) {
    let headers: HttpHeaders = new HttpHeaders();
    headers = headers.append('Authorization', 'Bearer ' + this.token);
    let url = URL_SERVICES + '/user/update';

    return this.http.put( url, user, { headers } )
                    .pipe(map ( (res: any) => {
                      this.user = res.user;
                      Swal.fire({
                        title: '¡Hecho!',
                        text: 'Los cambios se han guardado',
                        icon: 'success',
                        timer: 2000,
                        timerProgressBar: true,
                        width: '340px',
                        showConfirmButton: false
                      });
                    }))
                    .subscribe( () => {
                      this.saveLocalStorage(this.user, this.token);
                    });
  }

  updateUserImage( file: File, id: string ) {
    this._uploadService.upload( file, this.token )
    .then( (res: any) => {
      this.user.avatar = res.fileName;
      this.updateUser(this.user);
    })
    .catch( (err) => {
      Swal.fire({
        title: '¡Error!',
        html: `<p>Parece que no hemos podido subir la imagen.</p><small>${err}</small>`,
        icon: 'error',
        confirmButtonText: 'Vale',
        focusConfirm: false,
        customClass: {
          actions: 'row',
          confirmButton: 'col btn btn-primary btn-big'
        },
        buttonsStyling: false
      })
    });
  }

  decryptLocalUserInfo() {
    this.user = new User(
      CryptoJS.AES.decrypt(localStorage.getItem('ue'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
      ':)',
      CryptoJS.AES.decrypt(localStorage.getItem('un'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
      CryptoJS.AES.decrypt(localStorage.getItem('us'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
      CryptoJS.AES.decrypt(localStorage.getItem('ua'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
      CryptoJS.AES.decrypt(localStorage.getItem('ui'), SECRET_KEY).toString(CryptoJS.enc.Utf8),
    );
  
    return this.user;
  }

  async saveLocalStorage( user: User, token: string ) {
    localStorage.removeItem('token');
    localStorage.removeItem('ue');
    localStorage.removeItem('un');
    localStorage.removeItem('us');
    localStorage.removeItem('ua');
    localStorage.removeItem('ui');
    localStorage.setItem('token', token);
    localStorage.setItem('un', CryptoJS.AES.encrypt(user.name, SECRET_KEY).toString());
    localStorage.setItem('us', CryptoJS.AES.encrypt(user.surname, SECRET_KEY).toString());
    localStorage.setItem('ue', CryptoJS.AES.encrypt(user.email, SECRET_KEY).toString());
    localStorage.setItem('ua', CryptoJS.AES.encrypt(user.avatar, SECRET_KEY).toString());
    localStorage.setItem('ui', CryptoJS.AES.encrypt(user._id, SECRET_KEY).toString());
    this.token = token;
    this.user = this.decryptLocalUserInfo();
  }

}
