import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';

import { MidiConnectionService } from "app/services/midi-connection/midi-connection.service";
import { MidiPortService } from "app/services/midi-port/midi-port.service";
import { MidiPort } from "app/services/midi-port/midi-port.class";
import { RoutingService } from "app/services/routing/routing.service";

@Component({
  selector: 'app-output-module',
  templateUrl: './output-module.component.html',
  styleUrls: ['./output-module.component.scss'],
  providers: [MidiPortService]
})
export class OutputModuleComponent implements OnInit {

  ports: WebMidi.MIDIPort[];
  selectedOutput: MidiPort;

  indicatorTrigger = false;

  routeIn$;
  routeInSubscription;

  constructor(
    private midiConnectionService: MidiConnectionService,
    private midiPortService: MidiPortService,
    private routingService: RoutingService,
    private cd: ChangeDetectorRef,
  ) { }

  ngOnInit() {
    this.midiConnectionService.ports$
      .pluck('outputPorts')
      .subscribe((ports: WebMidi.MIDIPort[]) => {
        this.ports = ports;
        this.cd.detectChanges();
      });
  }

  selectPort({value}) {
    if (value) {
      this.selectedOutput = this.midiPortService.getPort(value);
    } else {
      this.selectedOutput = undefined;
    }
  }

  onRouteSelection($event) {
    this.setInputRoute($event);
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

  private onIncoming(data) {
    if(this.selectedOutput) {
      this.indicatorTrigger = !this.indicatorTrigger;
      console.log(data);
      this.selectedOutput.send(data);
      this.cd.detectChanges();
    }
  }
}
