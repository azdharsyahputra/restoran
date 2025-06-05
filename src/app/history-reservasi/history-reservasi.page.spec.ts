import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistoryReservasiPage } from './history-reservasi.page';

describe('HistoryReservasiPage', () => {
  let component: HistoryReservasiPage;
  let fixture: ComponentFixture<HistoryReservasiPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistoryReservasiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
