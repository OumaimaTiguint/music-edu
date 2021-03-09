import { TestBed } from '@angular/core/testing';

import { AllowAccessService } from './allow-access.service';

describe('AllowAccessService', () => {
  let service: AllowAccessService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AllowAccessService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
