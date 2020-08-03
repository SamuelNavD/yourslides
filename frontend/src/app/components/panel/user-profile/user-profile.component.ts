import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: [
    './user-profile.component.scss'
  ]
})
export class UserProfileComponent implements OnInit {

  user: User;
  userUpload: File;
  imgTemp: any = null;

  constructor(
    public _userService: UserService
  ) {
    this.user = this._userService.user;
    this.user.password = "";
  }

  ngOnInit(): void {
    
  }

  updateUser( form: NgForm ) {

    this.user.name = form.value.name;
    this.user.surname = form.value.surname;
    this.user.email = form.value.email;
    
    this._userService.updateUser( this.user );
  }

  updateUserImage() {
    this._userService.updateUserImage(this.userUpload, this.user._id);
  }

  uploadImage( file: File ) {
    if ( !file ) {
      this.userUpload = null;
      return;
    }

    const reader = new FileReader();
    reader.readAsDataURL( file );

    reader.onloadend = () => {
      this.imgTemp = reader.result;
    }

    this.userUpload = file;
  }

}
