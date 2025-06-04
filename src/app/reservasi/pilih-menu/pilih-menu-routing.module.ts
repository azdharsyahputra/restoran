import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PilihMenuPage } from './pilih-menu.page';

const routes: Routes = [
  {
    path: '',
    component: PilihMenuPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PilihMenuPageRoutingModule {}
