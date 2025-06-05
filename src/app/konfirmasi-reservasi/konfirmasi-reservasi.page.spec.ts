import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KonfirmasiReservasiPage } from './konfirmasi-reservasi.page';

describe('KonfirmasiReservasiPage', () => {
  let component: KonfirmasiReservasiPage;
  let fixture: ComponentFixture<KonfirmasiReservasiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KonfirmasiReservasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
