import { TestBed } from '@angular/core/testing';

import { PembayaranService } from './pembayaran.service';

describe('PembayaranService', () => {
  let service: PembayaranService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PembayaranService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
