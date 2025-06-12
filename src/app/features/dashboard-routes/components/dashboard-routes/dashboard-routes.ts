import { Component, inject, OnInit, signal } from '@angular/core';
import { DashboardRoutesService } from '../../services/dashboard-routes-service';
import { MatIconModule } from "@angular/material/icon";
import { IRoutes } from '../../interfaces/iroutes';
import { CdkFixedSizeVirtualScroll } from '@angular/cdk/scrolling';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';



@Component({
  selector: 'app-dashboard-routes',

  templateUrl: './dashboard-routes.html',
  imports: [
    MatIconModule,
    CdkFixedSizeVirtualScroll,
    InfiniteScrollDirective
  ],
  styleUrl: './dashboard-routes.scss'
})
export class DashboardRoutes implements OnInit {
  routesService = inject(DashboardRoutesService);
  routesData!: IRoutes[];
  displayedCount = signal(17);

  sortStates: { [key: string]: 'asc' | 'desc' | null } = {
    address: null,
    name: null,
    interface: null,
  };

  ngOnInit() {
    this.routesData = [...this.routesService.routesData()];
  }

  onScroll() {
    if (this.displayedCount() < this.routesData.length) {
      this.displayedCount.update(value => Math.min(value + 10, this.routesData.length));
    }
  }

  sortColumn(column: string) {

    Object.keys(this.sortStates).forEach(key => {
      if (key !== column) {
        this.sortStates[key] = null;
      }
    });

    if (this.sortStates[column] === 'asc') {
      this.sortStates[column] = 'desc';
    } else {
      this.sortStates[column] = 'asc';
    }
  }
}
