import { TestBed } from '@angular/core/testing';

import { ValidatepassService } from './validatepass.service';

describe('ValidatepassService', () => {
  let service: ValidatepassService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ValidatepassService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
