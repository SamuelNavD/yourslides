import { Component, OnInit } from '@angular/core';
import { SlideService } from 'src/app/services/slide.service';
import { Slide } from 'src/app/models/slide';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-slides',
  templateUrl: './slides.component.html',
  styleUrls: ['./slides.component.scss']
})
export class SlidesComponent implements OnInit {

  public slides: Array<Slide>;

  constructor(
    public _slideService: SlideService,
    public _userService: UserService
  ) { }

  ngOnInit(): void {
    this._slideService.getAll(this._userService.user._id).subscribe( res => {
      this.slides = res.slides;
    });
  }
}
