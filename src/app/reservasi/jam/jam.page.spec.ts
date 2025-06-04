import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JamPage } from './jam.page';

describe('JamPage', () => {
  let component: JamPage;
  let fixture: ComponentFixture<JamPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JamPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
