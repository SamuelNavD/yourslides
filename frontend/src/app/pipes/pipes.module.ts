import { NgModule } from '@angular/core';
import { ImagePipe } from './image.pipe';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    ImagePipe
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ImagePipe
  ]
})
export class PipesModule { }
