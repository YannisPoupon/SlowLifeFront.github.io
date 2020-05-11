import { TestBed } from '@angular/core/testing';

import { ModifProfilProfessionnelService } from './modif-profil-professionnel.service';

describe('ModifProfilProfessionnelService', () => {
  let service: ModifProfilProfessionnelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ModifProfilProfessionnelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
