import { Component, inject } from '@angular/core';
import { DashboardRoutesService } from '../../services/dashboard-routes-service';
import { MatIconModule } from "@angular/material/icon";
import { IRoutes } from '../../interfaces/iroutes';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'app-dashboard-routes',
  templateUrl: './dashboard-routes.html',
  imports: [
    MatIconModule,
    InfiniteScrollDirective,
    NgTemplateOutlet
  ],
  styleUrl: './dashboard-routes.scss'
})
export class DashboardRoutes {
  routesService = inject(DashboardRoutesService);

  sortColumn(column: keyof IRoutes) {
    this.routesService.toggleSort(column);
  }
}
