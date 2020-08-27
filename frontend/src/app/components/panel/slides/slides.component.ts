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
      console.log(this.slides);
    });
  }

  calculateDiffDates(dateEdited: Date){
    let currentDate = new Date();
    dateEdited = new Date(dateEdited);
 
    var diff = Math.floor((Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate(), currentDate.getHours(), currentDate.getMinutes(), currentDate.getSeconds()) - Date.UTC(dateEdited.getFullYear(), dateEdited.getMonth(), dateEdited.getDate(), dateEdited.getHours(), dateEdited.getMinutes(), dateEdited.getSeconds()))/1000);
    var text = "Última edición hace ";

    if (diff < 60) {
      text += diff + " segundos";
    } else if (diff < 3600) {
      diff = Math.floor(diff / 60);
      text += diff + " minuto";
      if (diff != 1) text += "s";
    } else if (diff < 86400) {
      diff = Math.floor(diff / 3600);
      text += diff + " hora";
      if (diff != 1) text += "s";
    } else if (diff < 2592000) {
      diff = Math.floor(diff / 86400);
      text += diff + " día";
      if (diff != 1) text += "s";
    } else if (diff < 31104000) {
      diff = Math.floor(diff / 2592000);
      text += diff + " mes";
      if (diff != 1) text += "es";
    } else if (diff > 31104000) {
      diff = Math.floor(diff / 31104000);
      text += diff + " año";
      if (diff != 1) text += "s";
    } else {
      text = "Sin registro de ediciones";
    }


    return text;
   }

}
