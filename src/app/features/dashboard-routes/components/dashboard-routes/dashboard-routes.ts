import { Component, computed, inject, signal } from '@angular/core';
import { DashboardRoutesService } from '../../services/dashboard-routes-service';
import { MatIconModule } from "@angular/material/icon";
import { IRoutes } from '../../interfaces/iroutes';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';

@Component({
  selector: 'app-dashboard-routes',
  templateUrl: './dashboard-routes.html',
  imports: [
    MatIconModule,
    InfiniteScrollDirective
  ],
  styleUrl: './dashboard-routes.scss'
})
export class DashboardRoutes {
  routesService = inject(DashboardRoutesService);

  sortColumn(column: keyof IRoutes) {
    this.routesService.sortColumn(column);
  }

  onScroll() {
    this.routesService.onScroll();
  }
}
