import { TestBed } from '@angular/core/testing';

import { DashboardRoutesService } from './dashboard-routes-service';

describe('DashboardRoutesService', () => {
  let service: DashboardRoutesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardRoutesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
