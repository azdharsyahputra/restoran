import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SuksesPage } from './sukses.page';

describe('SuksesPage', () => {
  let component: SuksesPage;
  let fixture: ComponentFixture<SuksesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SuksesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
