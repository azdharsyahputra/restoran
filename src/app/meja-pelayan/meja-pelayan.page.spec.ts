import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MejaPelayanPage } from './meja-pelayan.page';

describe('MejaPelayanPage', () => {
  let component: MejaPelayanPage;
  let fixture: ComponentFixture<MejaPelayanPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MejaPelayanPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
