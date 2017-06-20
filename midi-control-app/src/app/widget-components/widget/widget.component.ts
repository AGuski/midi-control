import { Component, Input } from '@angular/core';
import { Subject } from "rxjs/Rx";

@Component({
  selector: 'app-widget',
  templateUrl: './widget.component.html',
  styleUrls: ['./widget.component.scss']
})
export class WidgetComponent {

  @Input() widgetId: number;

  @Input() state: {
    routeInId: string;
    routeOutId: string;
  };

  outgoing$ = new Subject<any>();

  constructor() { }

  onIncoming(data) { }

  toOutgoing(data) {
    this.outgoing$.next(data);
  }

  // Rework widgets to not subscribe and change but to operate directly on streams and pass them further

}
