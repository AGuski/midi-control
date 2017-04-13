import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';

import { MidiConnectionService } from 'app/services/midi-connection/midi-connection.service';
import { MidiPortService } from 'app/services/midi-port/midi-port.service';
import { MidiPort } from 'app/services/midi-port/midi-port.class';
import { RoutingService } from 'app/services/routing/routing.service';

import { MessageIndicatorComponent } from 'app/components/message-indicator/message-indicator.component';

@Component({
  selector: 'app-input-module',
  templateUrl: './input-module.component.html',
  styleUrls: ['./input-module.component.scss'],
  providers: [MidiPortService]
})
export class InputModuleComponent implements OnInit {

  @ViewChild('inputIndicator') inputIndicator: MessageIndicatorComponent;

  ports: WebMidi.MIDIPort[];
  mappings = [ 
    {name: 'Axiom 25', id:'axiom-25'},
    {name: 'Waldorf Pulse', id:'waldorf-pulse'}
  ]

  selectedInput: MidiPort;

  portSubscription;

  routeOut$;

  constructor(
    private midiConnectionService: MidiConnectionService,
    private midiPortService: MidiPortService,
    private routingService: RoutingService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    this.midiConnectionService.ports$
      .pluck('inputPorts')
      .subscribe((ports: WebMidi.MIDIPort[]) => {
        this.ports = ports;
        this.cd.detectChanges();
      });
  }

  // ngOnDestroy() {
  //   // Because of this: maybe get the ports in a parent Component for Input Area and distribute by binding?!
  //   this.midiConnectionService.ports$.unsubscribe();
  // }

  selectPort({value}) {
    if (this.portSubscription) {
      this.portSubscription.unsubscribe();
    }
    if (value) {
      this.selectedInput = this.midiPortService.getPort(value);
      this.portSubscription = this.selectedInput.subscribe(data => {
        this.onPortInput(data);
        this.cd.detectChanges();
      });
    }
  }

  onRouteSelection($event) {
    this.setOutputRoute($event);
  }

  setOutputRoute(routeOut) {
    this.routeOut$ = this.routingService.getRoute(routeOut).getSubject();
  }

  selectMapping({value}) {
    
  }

  private onPortInput(data: number[]) {
    this.inputIndicator.trigger();
    this.toRouteOut(data);
  }

  private toRouteOut(message) {
    if(this.routeOut$) {
      this.routeOut$.next(message);
    }
  }
}
