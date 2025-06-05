import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { HistoryReservasiPageRoutingModule } from './history-reservasi-routing.module';

import { HistoryReservasiPage } from './history-reservasi.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HistoryReservasiPageRoutingModule
  ],
  declarations: [HistoryReservasiPage]
})
export class HistoryReservasiPageModule {}
