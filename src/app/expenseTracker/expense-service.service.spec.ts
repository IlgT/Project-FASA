import { TestBed } from '@angular/core/testing';

import { ExpenseService } from './expense-service.service';

describe('ExpenseServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ExpenseService = TestBed.get(ExpenseService);
    expect(service).toBeTruthy();
  });
});
