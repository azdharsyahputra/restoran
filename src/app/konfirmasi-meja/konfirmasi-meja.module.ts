import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KonfirmasiMejaPageRoutingModule } from './konfirmasi-meja-routing.module';

import { KonfirmasiMejaPage } from './konfirmasi-meja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KonfirmasiMejaPageRoutingModule
  ],
  declarations: [KonfirmasiMejaPage]
})
export class KonfirmasiMejaPageModule {}
