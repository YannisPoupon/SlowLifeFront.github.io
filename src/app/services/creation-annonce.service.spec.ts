import { TestBed } from '@angular/core/testing';

import { CreationAnnonceService } from './creation-annonce.service';

describe('CreationAnnonceService', () => {
  let service: CreationAnnonceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationAnnonceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
