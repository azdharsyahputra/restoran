import { TestBed } from '@angular/core/testing';

import { HistoriService } from './histori.service';

describe('HistoriService', () => {
  let service: HistoriService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HistoriService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
