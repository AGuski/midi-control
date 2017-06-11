import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';

import { ModuleComponent } from './../module/module.component';

@Component({
  selector: 'app-single-control-module',
  templateUrl: './single-control-module.component.html',
  styleUrls: ['./single-control-module.component.scss']
})
export class SingleControlModuleComponent extends ModuleComponent {

  @Input() state: {
    routeInId: string;
    routeOutId: string;
    parameterId: number;
    inputValue: number;
  };

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  onIncoming(data) {
    if (data[0] === 176 && data[1] === this.state.parameterId) {
      this.state.inputValue = data[2];
      this.cd.detectChanges();
    }
    this.toOutgoing(data); // <-- midi thru
  }

  // TODO: Fino out how to not skip value when using slider

  setValue(value) {
    if (this.state.parameterId) {
      this.toOutgoing([176, this.state.parameterId, value]);
    }

  }

}
