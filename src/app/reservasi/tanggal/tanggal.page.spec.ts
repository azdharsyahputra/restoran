import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TanggalPage } from './tanggal.page';

describe('TanggalPage', () => {
  let component: TanggalPage;
  let fixture: ComponentFixture<TanggalPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TanggalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
