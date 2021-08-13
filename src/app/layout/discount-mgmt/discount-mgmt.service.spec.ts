import { TestBed } from '@angular/core/testing';

import { DiscountMgmtService } from './discount-mgmt.service';

describe('DiscountMgmtService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: DiscountMgmtService = TestBed.get(DiscountMgmtService);
    expect(service).toBeTruthy();
  });
});
