import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { KonfirmasiReservasiPageRoutingModule } from './konfirmasi-reservasi-routing.module';

import { KonfirmasiReservasiPage } from './konfirmasi-reservasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    KonfirmasiReservasiPageRoutingModule
  ],
  declarations: [KonfirmasiReservasiPage]
})
export class KonfirmasiReservasiPageModule {}
