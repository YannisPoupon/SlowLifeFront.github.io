import { TestBed } from '@angular/core/testing';

import { EspaceProfessionnelService } from './espace-professionnel.service';

describe('EspaceProfessionnelService', () => {
  let service: EspaceProfessionnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EspaceProfessionnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
