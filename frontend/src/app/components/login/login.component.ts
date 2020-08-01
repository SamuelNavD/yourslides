import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: [
  ]
})
export class LoginComponent implements OnInit {

  rememberme: boolean = false;
  email: string;

  constructor(
    public _userService: UserService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.email = localStorage.getItem('email') || '';
    if ( this.email != '' ) this.rememberme = true;
  }

  loginUsuario( form: NgForm ) {
    if ( form.valid ) {
      let user = new User(
        form.value.email,
        form.value.password,
        null
      );

      this._userService.loginUser(user, form.value.rememberme).subscribe( res => {
        this.router.navigate(['/panel']);
      });
    }
  }
}
