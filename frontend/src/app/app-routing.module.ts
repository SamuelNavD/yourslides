import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './components/_layouts/site-layout/site-layout.component';
import { PanelLayoutComponent } from './components/_layouts/panel-layout/panel-layout.component';
import { HomePanelComponent } from './components/panel/home-panel/home-panel.component';
import { LoginComponent } from './components/login/login.component';
import { RegistroComponent } from './components/registro/registro.component';
import { Page404Component } from './components/page404/page404.component';
import { UserProfileComponent } from './components/panel/user-profile/user-profile.component';
import { EditorLayoutComponent } from './components/_layouts/editor-layout/editor-layout.component';
import { NewSlideComponent } from './components/panel/new-slide/new-slide.component';

import { LoginGuard } from './services/guards/login.guard';

const routes: Routes = [
  {
    path: 'panel',
    component: PanelLayoutComponent,
    canActivate: [ LoginGuard ],
    children: [
      { path: 'slides/nueva', component: NewSlideComponent },
      { path: 'perfil', component: UserProfileComponent },
      { path: '', component: HomePanelComponent}
    ]
  },
  {
    path: 'editor/:id',
    component: EditorLayoutComponent,
    canActivate: [ LoginGuard ]
  },
  {
    path: 'acceso',
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'registro', component: RegistroComponent }
    ]
  },
  {
    path: '',
    component: SiteLayoutComponent,
    children: [
      { path: '', redirectTo: '/acceso/login', pathMatch: 'full' },
      { path: '**', component: Page404Component }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
