import { Component, computed, inject, OnInit, signal } from '@angular/core';
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
  displayedCount = signal(10);

  rawRoutes = this.routesService.routesData;

  sortKey = signal<keyof IRoutes | null>(null);
  sortDirection = signal<'asc' | 'desc' | null>(null);

  sortedRoutes = computed(() => {
    const key = this.sortKey();
    const direction = this.sortDirection();
    const routes = this.rawRoutes();

    if (!key || !direction) return routes;

    return [...routes].sort((a, b) => {
      const valA = a[key];
      const valB = b[key];

      if (typeof valA === 'string' && typeof valB === 'string') {
        return direction === 'asc'
          ? valA.localeCompare(valB)
          : valB.localeCompare(valA);
      }

      if (typeof valA === 'number' && typeof valB === 'number') {
        return direction === 'asc' ? valA - valB : valB - valA;
      }

      return direction === 'asc'
        ? String(valA).localeCompare(String(valB))
        : String(valB).localeCompare(String(valA));
    });
  });

  sortedRoutesLength = computed(() => this.sortedRoutes().length);

  displayedRoutes = computed(() =>
    this.sortedRoutes().slice(0, this.displayedCount())
  );

  onScroll() {
    if (this.displayedCount() < this.sortedRoutesLength()) {
      this.displayedCount.update(value =>
        Math.min(value + 10, this.sortedRoutesLength())
      );
    }
  }

  sortColumn(column: keyof IRoutes) {
    if (this.sortKey() === column) {
      this.sortDirection.update(dir =>
        dir === 'asc' ? 'desc' :
          dir === 'desc' ? null : 'asc'
      );

      if (this.sortDirection() === null) {
        this.sortKey.set(null);
      }
    } else {
      this.sortKey.set(column);
      this.sortDirection.set('asc');
    }
  }
}
