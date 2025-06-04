import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TanggalPage } from './tanggal.page';

const routes: Routes = [
  {
    path: '',
    component: TanggalPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TanggalPageRoutingModule {}
