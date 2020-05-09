import { TestBed } from '@angular/core/testing';

import { AnnonceJobService } from './annonce-job.service';

describe('AnnonceJobService', () => {
  let service: AnnonceJobService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AnnonceJobService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
