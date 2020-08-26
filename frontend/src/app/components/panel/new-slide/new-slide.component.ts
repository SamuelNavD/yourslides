import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Slide } from 'src/app/models/slide';
import { UserService } from 'src/app/services/user.service';
import { SlideService } from 'src/app/services/slide.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-slide',
  templateUrl: './new-slide.component.html',
  styleUrls: ['./new-slide.component.scss']
})
export class NewSlideComponent implements OnInit {

  public slide: Slide = {
    title: '',
    setting: 'light',
    owner: ''
  };

  constructor(
    public _userService: UserService,
    public _slideService: SlideService,
    public router: Router
  ) { }

  ngOnInit(): void {
    this.slide.owner = this._userService.user._id;
  }

  createSlide() {
    this._slideService.createSlide(this.slide).subscribe( res => {
      this.router.navigate(['/editor', res.slide._id]);
    });
  }
}
