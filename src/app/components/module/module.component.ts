import { Component, Input } from '@angular/core';
import { Subject } from "rxjs/Rx";

@Component({
  selector: 'app-module',
  templateUrl: './module.component.html',
  styleUrls: ['./module.component.scss']
})
export class ModuleComponent {

  @Input() moduleId: number;

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

  // Rework modules to not subscribe and change but to operate directly on streams and pass them further

}
