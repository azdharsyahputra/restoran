import { TestBed } from '@angular/core/testing';

import { PemesananLangsungService } from './pemesanan-langsung.service';

describe('PemesananLangsungService', () => {
  let service: PemesananLangsungService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PemesananLangsungService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
