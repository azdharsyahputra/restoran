import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PilihMenuPage } from './pilih-menu.page';

describe('PilihMenuPage', () => {
  let component: PilihMenuPage;
  let fixture: ComponentFixture<PilihMenuPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PilihMenuPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
