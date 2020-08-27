import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'app-theme-list',
  templateUrl: './theme-list.component.html',
  styleUrls: ['./theme-list.component.scss']
})
export class ThemeListComponent implements OnInit {

  @Input()
  setting: String;

  @Output() themeChange: EventEmitter<String>;

  constructor() {
    this.themeChange = new EventEmitter();
  }

  ngOnInit(): void {
    
  }

  sendTheme(setting: String) {
    this.setting = setting;
    this.themeChange.emit(this.setting);
  }

}
