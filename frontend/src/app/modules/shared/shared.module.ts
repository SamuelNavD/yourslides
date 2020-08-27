import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeListComponent } from 'src/app/components/theme-list/theme-list.component';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    ThemeListComponent
  ],
  imports: [
    CommonModule,
    FormsModule
  ],
  exports: [
    ThemeListComponent
  ]
})
export class SharedModule { }
