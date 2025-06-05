import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HistoryReservasiPage } from './history-reservasi.page';

const routes: Routes = [
  {
    path: '',
    component: HistoryReservasiPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HistoryReservasiPageRoutingModule {}
