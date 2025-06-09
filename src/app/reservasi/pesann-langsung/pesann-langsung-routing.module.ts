import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PesannLangsungPage } from './pesann-langsung.page';

const routes: Routes = [
  {
    path: '',
    component: PesannLangsungPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PesannLangsungPageRoutingModule {}
