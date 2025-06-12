import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DashboardRoutes } from './features/dashboard-routes/components/dashboard-routes/dashboard-routes';

@Component({
  selector: 'app-root',
  imports: [DashboardRoutes],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected title = 'routeTestTask';
}
