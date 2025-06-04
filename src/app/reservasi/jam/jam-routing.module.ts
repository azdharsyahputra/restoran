import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { JamPage } from './jam.page';

const routes: Routes = [
  {
    path: '',
    component: JamPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class JamPageRoutingModule {}
