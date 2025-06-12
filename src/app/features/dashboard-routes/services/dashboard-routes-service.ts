import { Injectable, signal } from '@angular/core';
import routesData from '../../assets/routesData.json'


@Injectable({
  providedIn: 'root'
})
export class DashboardRoutesService {

  routesData = signal(routesData);

}
