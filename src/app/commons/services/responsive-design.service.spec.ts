import { TestBed } from '@angular/core/testing';

import { ResponsiveDesignService } from './responsive-design.service';

describe('ResponsiveDesignService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ResponsiveDesignService = TestBed.get(ResponsiveDesignService);
    expect(service).toBeTruthy();
  });
});
