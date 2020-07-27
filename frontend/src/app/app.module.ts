import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UsersComponent } from './components/users/users.component';
import { SiteLayoutComponent } from './components/_layouts/site-layout/site-layout.component';
import { PanelLayoutComponent } from './components/_layouts/panel-layout/panel-layout.component';
import { HomePanelComponent } from './components/panel/home-panel/home-panel.component';

@NgModule({
  declarations: [
    AppComponent,
    UsersComponent,
    SiteLayoutComponent,
    PanelLayoutComponent,
    HomePanelComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
