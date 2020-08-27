import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PanelComponent } from './panel.component';
import { PanelLayoutComponent } from '../_layouts/panel-layout/panel-layout.component';
import { HomePanelComponent } from './home-panel/home-panel.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NewSlideComponent } from './new-slide/new-slide.component';
import { SharedModule } from 'src/app/modules/shared/shared.module';
import { SlidesComponent } from './slides/slides.component';

@NgModule({
  declarations: [
    PanelComponent,
    PanelLayoutComponent,
    HomePanelComponent,
    UserProfileComponent,
    NewSlideComponent,
    SlidesComponent
  ],
  imports: [
    AppRoutingModule,
    PipesModule,
    FormsModule,
    CommonModule,
    SharedModule
  ]
})
export class PanelModule { }