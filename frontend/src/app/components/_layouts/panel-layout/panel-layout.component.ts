import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-panel-layout',
  templateUrl: './panel-layout.component.html',
  styleUrls: ['./panel-layout.component.scss']
})
export class PanelLayoutComponent implements OnInit {

  user: User;
  
  constructor(
    public _userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this._userService.decryptLocalUserInfo();
  }

}
