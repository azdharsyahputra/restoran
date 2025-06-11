import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SuksesPage } from './sukses.page';

const routes: Routes = [
  {
    path: '',
    component: SuksesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuksesPageRoutingModule {}
