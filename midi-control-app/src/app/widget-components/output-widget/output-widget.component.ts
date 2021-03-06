import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';

import { MidiConnectionService } from "app/services/midi-connection/midi-connection.service";
import { MidiPortService } from "app/services/midi-port/midi-port.service";
import { MidiPort } from "app/services/midi-port/midi-port.class";

import { MessageIndicatorComponent } from 'app/shared/message-indicator/message-indicator.component';
import { WidgetComponent } from 'app/widget-components/widget/widget.component';

@Component({
  selector: 'app-output-widget',
  templateUrl: './output-widget.component.html',
  styleUrls: ['./output-widget.component.scss'],
  providers: [MidiPortService]
})
export class OutputWidgetComponent extends WidgetComponent implements OnInit {

  @ViewChild('outputIndicator') outputIndicator: MessageIndicatorComponent;

  @Input() state: {
    routeInId: string;
    routeOutId: string;
    selectedPortId: string;
  };

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
        if ( this.state.selectedPortId) {
          this.selectPort({value: this.state.selectedPortId});
        };
        this.cd.detectChanges();
      });
  }

  selectPort({value}) {
    if (value) {
      this.selectedOutput = this.midiPortService.getPort(value);
      if (this.selectedOutput) {
        this.state.selectedPortId = this.selectedOutput.id;
      }
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
