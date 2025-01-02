import { TestBed } from '@angular/core/testing';

import { FaqsApiService } from './faqs-api.service';

describe('FaqsApiService', () => {
  let service: FaqsApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FaqsApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
