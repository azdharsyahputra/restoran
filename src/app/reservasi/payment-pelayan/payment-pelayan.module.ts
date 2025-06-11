import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PaymentPelayanPageRoutingModule } from './payment-pelayan-routing.module';

import { PaymentPelayanPage } from './payment-pelayan.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PaymentPelayanPageRoutingModule
  ],
  declarations: [PaymentPelayanPage]
})
export class PaymentPelayanPageModule {}
