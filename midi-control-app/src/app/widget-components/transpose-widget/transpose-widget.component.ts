import { Component, Input, ChangeDetectorRef } from '@angular/core';

import { WidgetComponent } from 'app/widget-components/widget/widget.component';

@Component({
  selector: 'app-transpose-widget',
  templateUrl: './transpose-widget.component.html',
  styleUrls: ['./transpose-widget.component.scss']
})
export class TransposeWidgetComponent extends WidgetComponent {

    @Input() state: {
    routeInId: string;
    routeOutId: string;
    transposeValue: number;
    inputValue: number;
  };

  constructor(private cd: ChangeDetectorRef) {
    super();
  }

  onIncoming(data) {
    const statusbyte = data[0] & 0xf0; // verunden um channel-information zu entfernen.
    if ((statusbyte === 0x90 || statusbyte === 0x80) && this.state.transposeValue) { // noteOn & noteOff
      data[1] = data[1] += this.state.transposeValue;
      this.cd.detectChanges();
    }
    this.toOutgoing(data); // <-- midi thru
  }
}
