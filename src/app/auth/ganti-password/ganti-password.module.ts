import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GantiPasswordPageRoutingModule } from './ganti-password-routing.module';

import { GantiPasswordPage } from './ganti-password.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GantiPasswordPageRoutingModule
  ],
  declarations: [GantiPasswordPage]
})
export class GantiPasswordPageModule {}
