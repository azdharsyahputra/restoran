import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MejaPelayanPageRoutingModule } from './meja-pelayan-routing.module';

import { MejaPelayanPage } from './meja-pelayan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MejaPelayanPageRoutingModule
  ],
  declarations: [MejaPelayanPage]
})
export class MejaPelayanPageModule {}
