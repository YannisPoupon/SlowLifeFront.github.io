import { TestBed } from '@angular/core/testing';

import { EspaceParticulierService } from './espace-particulier.service';

describe('EspaceParticulierService', () => {
  let service: EspaceParticulierService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspaceParticulierService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
