import { NgModule } from '@angular/core';
import { AppRoutingModule } from 'src/app/app-routing.module';
import { PanelComponent } from './panel.component';
import { PanelLayoutComponent } from '../_layouts/panel-layout/panel-layout.component';
import { HomePanelComponent } from './home-panel/home-panel.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

@NgModule({
  declarations: [
    PanelComponent,
    PanelLayoutComponent,
    HomePanelComponent,
    UserProfileComponent
  ],
  imports: [
    AppRoutingModule
  ]
})
export class PanelModule { }