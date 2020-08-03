import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styles: [
  ]
})
export class RegistroComponent implements OnInit {

  formRegistro: FormGroup;

  constructor(
    public _userService: UserService,
    public router: Router
  ) { }

  passwordEquals( pass1: string, pass2: string ) {
    return ( group: FormGroup ) => {

      let passValue1 = group.controls[pass1].value;
      let passValue2 = group.controls[pass2].value;

      if ( passValue1 === passValue2 ) return null;

      return {
        equals: true
      };
    }
  }

  ngOnInit(): void {
    this.formRegistro = new FormGroup({
      name: new FormControl( null, Validators.required ),
      surname: new FormControl( null, Validators.required ),
      email: new FormControl( null, [Validators.required, Validators.email] ),
      password: new FormControl( null, Validators.required ),
      password2: new FormControl( null, Validators.required ),
      agree: new FormControl()
    }, { validators: this.passwordEquals( 'password', 'password2' ) });

    this.formRegistro.setValue({
      name: null,
      surname: null,
      email: null,
      password: null,
      password2: null,
      agree: null
    })
  }

  registroUsuario() {

    if ( this.formRegistro.valid ) {
      let user = new User(
        this.formRegistro.value.email,
        this.formRegistro.value.password,
        this.formRegistro.value.name,
        this.formRegistro.value.surname
      );

      this._userService.createUser(user).subscribe( res => {
        this._userService.loginUser(user, false);
        this.router.navigate(['/panel']);
      });
    } else if ( !this.formRegistro.value.agree ) {
      console.log('No se han aceptado las condiciones');
    }
  }

}
