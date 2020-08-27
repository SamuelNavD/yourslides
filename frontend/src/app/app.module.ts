import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { PanelModule } from './components/panel/panel.module';
import { AppComponent } from './app.component';
import { SiteLayoutComponent } from './components/_layouts/site-layout/site-layout.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { Page404Component } from './components/page404/page404.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import { HttpClientModule } from '@angular/common/http';
import { PipesModule } from './pipes/pipes.module';
import { UploadService } from './services/upload.service';
import { EditorLayoutComponent } from './components/_layouts/editor-layout/editor-layout.component';
import { EditorTextareaComponent } from './components/editor-textarea/editor-textarea.component';
import { SharedModule } from './modules/shared/shared.module';

@NgModule({
  declarations: [
    AppComponent,
    SiteLayoutComponent,
    LoginComponent,
    RegistroComponent,
    Page404Component,
    EditorLayoutComponent,
    EditorTextareaComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    PanelModule,
    HttpClientModule,
    PipesModule,
    SharedModule
  ],
  providers: [
    UserService,
    UploadService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
