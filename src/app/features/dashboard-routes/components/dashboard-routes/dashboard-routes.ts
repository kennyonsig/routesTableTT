import { Component, inject, OnInit } from '@angular/core';
import { DashboardRoutesService } from '../../services/dashboard-routes-service';
import { MatIconModule } from "@angular/material/icon";
import { IRoutes } from '../../interfaces/iroutes';
import { InfiniteScrollDirective } from 'ngx-infinite-scroll';
import { NgTemplateOutlet } from '@angular/common';
import { HttpClient } from '@angular/common/http';

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
export class DashboardRoutes implements OnInit {
  routesService = inject(DashboardRoutesService);
  http = inject(HttpClient);
  isLoading = true

  ngOnInit() {
    this.http.get<IRoutes[]>('assets/routesData.json').subscribe({
     next: (data: IRoutes[]) => {
       this.routesService.allRoutes.set(data);
       this.isLoading = false;
     }
   });
  }
  sortColumn(column: keyof IRoutes) {
    this.routesService.toggleSort(column);
  }
}
