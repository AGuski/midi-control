import { Component, OnInit } from '@angular/core';

import { RoutingService } from './../../services/routing/routing.service';
import { ModuleComponent } from './../module/module.component';

@Component({
  selector: 'app-single-control-module',
  templateUrl: './single-control-module.component.html',
  styleUrls: ['./single-control-module.component.scss']
})
export class SingleControlModuleComponent extends ModuleComponent implements OnInit {

  parameterId;

  constructor( routingService: RoutingService) {
    super(routingService);
   }

  ngOnInit() {
  }

  onRouteInSelection($event) {
    this.setInputRoute($event);
  }

  onRouteOutSelection($event) {
    this.setOutputRoute($event);
  }

  onIncoming(data) {
    this.toRouteOut(data); //<-- send-thru default? (better: add bypass button to modules)
  }

  setValue(value) {
    if (this.parameterId) {
      this.toRouteOut([176, this.parameterId, value]);
    }

  }

}
