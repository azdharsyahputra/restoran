import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PesannLangsungPageRoutingModule } from './pesann-langsung-routing.module';

import { PesannLangsungPage } from './pesann-langsung.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PesannLangsungPageRoutingModule
  ],
  declarations: [PesannLangsungPage]
})
export class PesannLangsungPageModule {}
