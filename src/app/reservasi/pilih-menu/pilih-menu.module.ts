import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PilihMenuPageRoutingModule } from './pilih-menu-routing.module';

import { PilihMenuPage } from './pilih-menu.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PilihMenuPageRoutingModule
  ],
  declarations: [PilihMenuPage]
})
export class PilihMenuPageModule {}
