import { Component, OnInit, Input, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Subscription }                                           from 'rxJs';

import { MidiConnectionService }  from 'app/services/midi-connection/midi-connection.service';
import { MidiPortService }        from 'app/services/midi-port/midi-port.service';
import { MidiPort }               from 'app/services/midi-port/midi-port.class';

import { MessageIndicatorComponent }  from 'app/shared/message-indicator/message-indicator.component';
import { WidgetComponent }            from 'app/widget-components/widget/widget.component';

@Component({
  selector: 'app-input-widget',
  templateUrl: './input-widget.component.html',
  styleUrls: ['./input-widget.component.scss'],
  providers: [MidiPortService]
})
export class InputWidgetComponent extends WidgetComponent implements OnInit {

  @ViewChild('inputIndicator') inputIndicator: MessageIndicatorComponent;

  @Input() state: {
    routeInId: string;
    routeOutId: string;
    selectedPortId: string;
  };

  ports: WebMidi.MIDIPort[];
  // mappings = [
  //   {name: 'Axiom 25', id: 'axiom-25'},
  //   {name: 'Waldorf Pulse', id: 'waldorf-pulse'}
  // ];

  selectedInput: MidiPort;
  portSubscription: Subscription;

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
        if ( this.state.selectedPortId) {
          this.selectPort({value: this.state.selectedPortId});
        };
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
      if (this.selectedInput) {
        this.state.selectedPortId = this.selectedInput.id;
        this.portSubscription = this.selectedInput.subscribe(data => {
          this.onPortInput(data);
          this.cd.detectChanges();
        });
      }
    }
  }

  selectMapping({value}) { }

  private onPortInput(data: number[]) {
    this.inputIndicator.trigger();
    this.toOutgoing(data);
  }
}
