import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SiteLayoutComponent } from './components/_layouts/site-layout/site-layout.component';
import { PanelLayoutComponent } from './components/_layouts/panel-layout/panel-layout.component';

import { HomePanelComponent } from './components/panel/home-panel/home-panel.component';

const routes: Routes = [
  {
    path: 'panel',
    component: PanelLayoutComponent,
    children: [
      { path: '', component: HomePanelComponent}
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
