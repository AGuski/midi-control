import { Component, OnInit, ChangeDetectorRef, Input } from '@angular/core';

import { WidgetComponent } from 'app/widget-components/widget/widget.component';

@Component({
  selector: 'app-single-control-widget',
  templateUrl: './single-control-widget.component.html',
  styleUrls: ['./single-control-widget.component.scss']
})
export class SingleControlWidgetComponent extends WidgetComponent {

  @Input() state: {
    routeInId: string;
    routeOutId: string;
    parameterId: number;
    inputValue: number;
  };

  readonly statusbyte = 176 // ControlChange

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  onIncoming(data) {
    if (data[0] === this.statusbyte && data[1] === this.state.parameterId) {
      this.state.inputValue = data[2];
      this.cd.detectChanges();
    }
    this.toOutgoing(data); // <-- midi thru
  }

  // TODO: Fino out how to not skip value when using slider

  setValue(value) {
    if (this.state.parameterId) {
      this.toOutgoing([this.statusbyte, this.state.parameterId, value]);
    }

  }

}
