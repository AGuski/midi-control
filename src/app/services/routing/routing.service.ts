import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { Route } from './route.class';

@Injectable()
export class RoutingService {

  routes = [];

  constructor() { }

  createRoute(id) {
    let route = new Route(id);
    this.routes.push(route);
  }

  getRoute(id) {
    return this.routes.find(
      route => route.id === id
    );
  }

  getAllRouteIds() {
    return this.routes.map(route => route.id);
  }

}
