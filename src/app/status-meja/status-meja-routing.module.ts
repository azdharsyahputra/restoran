import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatusMejaPage } from './status-meja.page';

const routes: Routes = [
  {
    path: '',
    component: StatusMejaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StatusMejaPageRoutingModule {}
