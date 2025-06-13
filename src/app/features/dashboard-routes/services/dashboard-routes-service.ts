import { computed, Injectable, signal } from '@angular/core';
import routesData from '../../assets/routesData.json'
import { IRoutes } from '../interfaces/iroutes';


@Injectable({
  providedIn: 'root'
})
export class DashboardRoutesService {
  routesData = signal(routesData);
  sortKey = signal<keyof IRoutes | null>(null);
  sortDirection = signal<'asc' | 'desc' | null>(null);
  displayedCount = signal(10);

  getIpNumber(ip: string): number {
    const octets = ip.split('.').map(Number);
    return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
  }

  getAddressPart(route: IRoutes) {
    const {address, mask} = route;
    const ipNumber = this.getIpNumber(address);
    const maskValue = Number(mask);

    return {
      network: ipNumber,
      mask: maskValue
    };
  }

  sortedRoutes = computed(() => {
    const key = this.sortKey();
    const direction = this.sortDirection();
    const routes = this.routesData();

    if (!key || !direction) return routes;

    return [...routes].sort((a, b) => {
      if (key === 'address') {
        const addressA = this.getAddressPart(a);
        const addressB = this.getAddressPart(b);

        if (addressA.network !== addressB.network) {
          return direction === 'asc'
            ? addressA.network - addressB.network
            : addressB.network - addressA.network;
        }

        if (addressA.mask !== addressB.mask) {
          return direction === 'asc'
            ? addressA.mask - addressB.mask
            : addressB.mask - addressA.mask;
        }

      } else if (key === 'gateway') {
        const gatewayA = this.getIpNumber(a.gateway);
        const gatewayB = this.getIpNumber(b.gateway);
        return direction === 'asc'
          ? gatewayA - gatewayB
          : gatewayB - gatewayA;
      }

      return direction === 'asc'
        ? a[key].localeCompare(b[key])
        : b[key].localeCompare(a[key]);
    });
  });

  sortedRoutesLength = computed(() => this.sortedRoutes().length);

  displayedRoutes = computed(() =>
    this.sortedRoutes().slice(0, this.displayedCount())
  );


  sortColumn(column: keyof IRoutes) {
    const isCurrentColumn = this.sortKey() === column;

    if (isCurrentColumn) {
      this.sortDirection.update(dir => {
        if (dir === 'asc') return 'desc';
        if (dir === 'desc') return null;
        return 'asc';
      });

      if (this.sortDirection() === null) {
        this.sortKey.set(null);
      }
    } else {
      this.sortKey.set(column);
      this.sortDirection.set('asc');
    }
  }

  onScroll() {
    if (this.displayedCount() < this.sortedRoutesLength()) {
      this.displayedCount.update(value =>
        Math.min(value + 10, this.sortedRoutesLength())
      );
    }
  }
}
