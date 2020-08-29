import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeListComponent } from 'src/app/components/theme-list/theme-list.component';
import { FormsModule } from '@angular/forms';
import { SlidesListComponent } from 'src/app/components/slides-list/slides-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ThemeListComponent,
    SlidesListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    ThemeListComponent,
    SlidesListComponent
  ]
})
export class SharedModule { }
