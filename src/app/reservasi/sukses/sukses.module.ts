import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SuksesPageRoutingModule } from './sukses-routing.module';

import { SuksesPage } from './sukses.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SuksesPageRoutingModule
  ],
  declarations: [SuksesPage]
})
export class SuksesPageModule {}
