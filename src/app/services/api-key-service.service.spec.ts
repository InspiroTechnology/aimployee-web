import { TestBed } from '@angular/core/testing';

import { ApiKeyServiceService } from './api-key-service.service';

describe('ApiKeyServiceService', () => {
  let service: ApiKeyServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiKeyServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
