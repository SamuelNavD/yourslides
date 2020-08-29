import { Component, OnInit, Input } from '@angular/core';
import { Slide } from 'src/app/models/slide';

@Component({
  selector: 'app-slides-list',
  templateUrl: './slides-list.component.html',
  styleUrls: ['./slides-list.component.scss']
})
export class SlidesListComponent implements OnInit {

  @Input()
  public slides: Array<Slide>;

  @Input()
  public limit: number = 0;

  constructor() { }

  ngOnInit(): void {
  }

  newTab(id: string) {
    window.open('s/'+id, '_blank');
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
