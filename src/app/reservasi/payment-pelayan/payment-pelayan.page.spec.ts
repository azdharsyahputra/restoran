import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PaymentPelayanPage } from './payment-pelayan.page';

describe('PaymentPelayanPage', () => {
  let component: PaymentPelayanPage;
  let fixture: ComponentFixture<PaymentPelayanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentPelayanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
