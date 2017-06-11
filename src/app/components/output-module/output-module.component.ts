import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';

import { MidiConnectionService } from "app/services/midi-connection/midi-connection.service";
import { MidiPortService } from "app/services/midi-port/midi-port.service";
import { MidiPort } from "app/services/midi-port/midi-port.class";

import { MessageIndicatorComponent } from 'app/components/message-indicator/message-indicator.component';
import { ModuleComponent } from "app/components/module/module.component";

@Component({
  selector: 'app-output-module',
  templateUrl: './output-module.component.html',
  styleUrls: ['./output-module.component.scss'],
  providers: [MidiPortService]
})
export class OutputModuleComponent extends ModuleComponent implements OnInit {

  @ViewChild('outputIndicator') outputIndicator: MessageIndicatorComponent;

  ports: WebMidi.MIDIPort[];
  selectedOutput: MidiPort;

  constructor(
    private midiConnectionService: MidiConnectionService,
    private midiPortService: MidiPortService,
    private cd: ChangeDetectorRef,
  ) {
    super();
   }

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

  onIncoming(data) {
    if (this.selectedOutput) {
      this.outputIndicator.trigger();
      console.log(data);
      this.selectedOutput.send(data);
      this.cd.detectChanges();
    }
  }
}
