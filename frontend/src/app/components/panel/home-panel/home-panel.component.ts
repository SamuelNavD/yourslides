import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import { SlideService } from 'src/app/services/slide.service';
import { Slide } from 'src/app/models/slide';

@Component({
  selector: 'app-home-panel',
  templateUrl: './home-panel.component.html',
  styleUrls: ['./home-panel.component.scss']
})
export class HomePanelComponent implements OnInit {

  public slides: Array<Slide>;

  user: User;

  constructor(
    public _userService: UserService,
    public _slideService: SlideService
  ) { }

  ngOnInit(): void {
    this.user = this._userService.user;
    this._slideService.getAll(this._userService.user._id).subscribe( res => {
      this.slides = res.slides;
    });
  }

}
