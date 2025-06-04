import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TanggalPageRoutingModule } from './tanggal-routing.module';

import { TanggalPage } from './tanggal.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TanggalPageRoutingModule
  ],
  declarations: [TanggalPage]
})
export class TanggalPageModule {}
