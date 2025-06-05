import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { StatusMejaPageRoutingModule } from './status-meja-routing.module';

import { StatusMejaPage } from './status-meja.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    StatusMejaPageRoutingModule
  ],
  declarations: [StatusMejaPage]
})
export class StatusMejaPageModule {}
