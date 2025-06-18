import { computed, Injectable, signal } from '@angular/core';
import { IRoutes } from '../interfaces/iroutes';

@Injectable({
  providedIn: 'root'
})
export class DashboardRoutesService {
  allRoutes = signal<IRoutes[]>([]);
  sortField = signal<keyof IRoutes | null>(null);
  sortOrder = signal<'asc' | 'desc' | null>(null);
  visibleCount = signal(10);

  ipToNumber(ip: string): number {
    const octets = ip.split('.').map(Number);
    return ((octets[0] << 24) | (octets[1] << 16) | (octets[2] << 8) | octets[3]) >>> 0;
  }

  parseAddress(route: IRoutes) {
    return {
      network: this.ipToNumber(route.address),
      mask: Number(route.mask)
    };
  }

  sortedRoutes = computed((): IRoutes[] => {
    const field = this.sortField();
    const order = this.sortOrder();
    const routes: IRoutes[] = this.allRoutes();
    const sortDirection = order === 'asc' ? 1 : -1;

    if (!field || !order) return routes;

    return [...routes].sort((a: IRoutes, b: IRoutes) => {

      if (field  === 'address') {
        const addressA = this.parseAddress(a);
        const addressB = this.parseAddress(b);

        if (addressA.network !== addressB.network) {
          return (addressA.network - addressB.network) * sortDirection;
        }

        if (addressA.mask !== addressB.mask) {
          return (addressA.mask - addressB.mask) * sortDirection;
        }

        return (this.ipToNumber(a.gateway) - this.ipToNumber(b.gateway)) * sortDirection;

      } else if (field  === 'gateway') {
        return (this.ipToNumber(a.gateway) - this.ipToNumber(b.gateway)) * sortDirection;
      }

      return a[field].localeCompare(b[field]) * sortDirection;
    });
  });

  displayedRoutes = computed((): IRoutes[] =>
    this.sortedRoutes().slice(0, this.visibleCount())
  );

  toggleSort(column: keyof IRoutes) {
    if (this.sortField() === column) {
      let currentOrder = this.sortOrder();

      switch (currentOrder) {
        case 'asc':
          currentOrder = 'desc'
          break;
        case 'desc':
          currentOrder = null
          this.sortField.set(null)
          break;
        case null:
          currentOrder = 'asc'
          break;
      }
      return this.sortOrder.set(currentOrder);
    }

    this.sortField.set(column);
    this.sortOrder.set('asc');
  }

  loadMore() {
    if (this.visibleCount() < this.sortedRoutes().length) {
      this.visibleCount.set(this.visibleCount() + 10);
    }
  }
}
