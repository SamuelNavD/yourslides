import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-editor-layout',
  templateUrl: './editor-layout.component.html',
  styleUrls: ['./editor-layout.component.scss']
})
export class EditorLayoutComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  toggleMenu(id: string) {
    var element = document.getElementById(id).classList;
    if (element.contains('open')) {
      element.remove('open');
      setTimeout(() => {
        element.add('hide');
      }, 100);
    } else {
      element.remove('hide');
      setTimeout(() => {
        element.add('open');
      }, 1);
    }
  }

}
