import { ComponentFixture, TestBed } from '@angular/core/testing';
import { KonfirmasiMejaPage } from './konfirmasi-meja.page';

describe('KonfirmasiMejaPage', () => {
  let component: KonfirmasiMejaPage;
  let fixture: ComponentFixture<KonfirmasiMejaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(KonfirmasiMejaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
