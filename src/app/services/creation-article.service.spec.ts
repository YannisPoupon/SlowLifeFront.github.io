import { TestBed } from '@angular/core/testing';

import { CreationArticleService } from './creation-article.service';

describe('CreationArticleService', () => {
  let service: CreationArticleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreationArticleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
