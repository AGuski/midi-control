import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';

import { MidiConnectionService } from 'app/services/midi-connection/midi-connection.service';
import { MidiPortService } from 'app/services/midi-port/midi-port.service';
import { MidiPort } from 'app/services/midi-port/midi-port.class';

import { MessageIndicatorComponent } from 'app/components/message-indicator/message-indicator.component';
import { ModuleComponent } from "app/components/module/module.component";

@Component({
  selector: 'app-input-module',
  templateUrl: './input-module.component.html',
  styleUrls: ['./input-module.component.scss'],
  providers: [MidiPortService]
})
export class InputModuleComponent extends ModuleComponent implements OnInit {

  @ViewChild('inputIndicator') inputIndicator: MessageIndicatorComponent;

  ports: WebMidi.MIDIPort[];
  mappings = [
    {name: 'Axiom 25', id: 'axiom-25'},
    {name: 'Waldorf Pulse', id: 'waldorf-pulse'}
  ];

  selectedInput: MidiPort;
  selectedPortId: string;
  portSubscription;

  constructor(
    private midiConnectionService: MidiConnectionService,
    private midiPortService: MidiPortService,
    private cd: ChangeDetectorRef
  ) {
    super();
   }

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
    console.log(value);
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

  selectMapping({value}) {

  }

  private onPortInput(data: number[]) {
    this.inputIndicator.trigger();
    this.toOutgoing(data);
  }
}
