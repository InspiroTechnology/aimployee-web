import { TestBed } from '@angular/core/testing';

import { KnowledgeGardenService } from './knowledge-garden.service';

describe('KnowledgeGardenService', () => {
  let service: KnowledgeGardenService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KnowledgeGardenService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
