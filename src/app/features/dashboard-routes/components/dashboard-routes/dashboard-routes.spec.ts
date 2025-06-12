import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardRoutes } from './dashboard-routes';

describe('DashboardRoutes', () => {
  let component: DashboardRoutes;
  let fixture: ComponentFixture<DashboardRoutes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardRoutes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardRoutes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
