import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserService } from '../user.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  canActivate() {
    if ( this._userService.isLogged() ) {
      return true;
    } else {
      this.router.navigate(['/acceso/login']);
      return false;
    }
  }
  
}
