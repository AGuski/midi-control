import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { RoutingService } from "app/services/routing/routing.service";

@Component({
  selector: 'app-route-selector',
  templateUrl: './route-selector.component.html',
  styleUrls: ['./route-selector.component.scss']
})
export class RouteSelectorComponent implements OnInit {

  @Input() selectedRoute: string;
  @Output() selectedRouteChange = new EventEmitter<string>();

  @Input() isInput: boolean;

  routes: string[];

  showAvailableRoutes: boolean;
  toolTip: string;

  constructor(private routingService: RoutingService) { }

  ngOnInit() {
    if (!this.selectedRoute) {
      this.selectedRoute = '#000';
    }
    this.showAvailableRoutes = false;
    this.routes = this.routingService.getAllRouteIds();

    this.toolTip = this.isInput ? 'Input Route' : 'Output Route'
  }

  selectRoute(route) {
    this.selectedRoute = route;
    this.selectedRouteChange.emit(this.selectedRoute);
    this.showAvailableRoutes = false;
  }

}
