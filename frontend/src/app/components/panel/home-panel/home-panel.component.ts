import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss']
})
export class HomePanelComponent implements OnInit {

  user: User;

  constructor(
    public _userService: UserService
  ) { }

  ngOnInit(): void {
    this.user = this._userService.decryptLocalUserInfo();
  }

}
