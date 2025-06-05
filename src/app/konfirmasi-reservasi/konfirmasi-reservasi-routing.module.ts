import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { KonfirmasiReservasiPage } from './konfirmasi-reservasi.page';

const routes: Routes = [
  {
    path: '',
    component: KonfirmasiReservasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class KonfirmasiReservasiPageRoutingModule {}
