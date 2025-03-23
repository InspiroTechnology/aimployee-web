import { TestBed } from '@angular/core/testing';

import { LayOutService } from './lay-out.service';

describe('LayOutService', () => {
  let service: LayOutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LayOutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
