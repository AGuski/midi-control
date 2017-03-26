import { Component, OnInit, Input } from '@angular/core';
import { RoutingService } from "app/services/routing/routing.service";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent implements OnInit {

  routeIn$;
  routeOut$;

  routeInSubscription;

  routingService;

  constructor(routingService: RoutingService) { this.routingService = routingService; }

  ngOnInit() {
    // this.setInputRoute(this.routeInId);
    // this.setOutputRoute(this.routeOutId);
  }
  
  setInputRoute(routeId) {
    if (this.routeInSubscription) {
      this.routeInSubscription.unsubscribe();
    }
    this.routeIn$ = this.routingService.getRoute(routeId).getSubject();
    this.routeInSubscription = this.routeIn$.subscribe(data => {
      this.onIncoming(data);
    });
  }

  setOutputRoute(routeId) {
    this.routeOut$ = this.routingService.getRoute(routeId).getSubject();
  }

  toRouteOut(message) {
    if(this.routeOut$) {
      this.routeOut$.next(message);
    }
  }
  
  onIncoming(message) {
    this.toRouteOut(message);
  }

}