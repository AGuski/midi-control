import { Component, OnInit, ChangeDetectorRef } from '@angular/core';

import { RoutingService } from './../../services/routing/routing.service';
import { ModuleComponent } from './../module/module.component';

@Component({
  selector: 'app-single-control-module',
  templateUrl: './single-control-module.component.html',
  styleUrls: ['./single-control-module.component.scss']
})
export class SingleControlModuleComponent extends ModuleComponent implements OnInit {

  parameterId: number;
  inputValue: number;

  constructor(
    routingService: RoutingService,
    private cd: ChangeDetectorRef
  ) {
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
    if (data[0] === 176 && data[1] === this.parameterId) {
      this.inputValue = data[2];
      this.cd.detectChanges();
    }
    this.toRouteOut(data); // <-- send-thru default? (better: add bypass button to modules)
  }

  // TODO: Fino out how to not skip value when using slider

  setValue(value) {
    if (this.parameterId) {
      this.toRouteOut([176, this.parameterId, value]);
    }

  }

}
