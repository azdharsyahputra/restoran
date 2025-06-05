import { TestBed } from '@angular/core/testing';

import { PelayanService } from './pelayan.service';

describe('PelayanService', () => {
  let service: PelayanService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PelayanService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
