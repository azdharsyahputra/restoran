import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PesannLangsungPage } from './pesann-langsung.page';

describe('PesannLangsungPage', () => {
  let component: PesannLangsungPage;
  let fixture: ComponentFixture<PesannLangsungPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PesannLangsungPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
