import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KonfirmasiMejaPage } from './konfirmasi-meja.page';

const routes: Routes = [
  {
    path: '',
    component: KonfirmasiMejaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KonfirmasiMejaPageRoutingModule {}
