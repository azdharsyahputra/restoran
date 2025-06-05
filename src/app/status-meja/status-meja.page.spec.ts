import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StatusMejaPage } from './status-meja.page';

describe('StatusMejaPage', () => {
  let component: StatusMejaPage;
  let fixture: ComponentFixture<StatusMejaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StatusMejaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
