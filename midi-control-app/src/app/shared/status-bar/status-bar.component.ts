import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MidiConnectionService } from '../../services/midi-connection/midi-connection.service';
import { MessageIndicatorComponent } from 'app/shared/message-indicator/message-indicator.component';

/**
 * Status bar
 * Investigate ChangeDetectorRef usability
 */


@Component({
  selector: 'app-status-bar',
  templateUrl: './status-bar.component.html',
  styleUrls: ['./status-bar.component.scss']
})
export class StatusBarComponent implements OnInit {

  @ViewChild('inputIndicator') inputIndicator: MessageIndicatorComponent;
  @ViewChild('outputIndicator') outputIndicator: MessageIndicatorComponent;

  inputPorts: number;
  outputPorts: number;

  constructor(
    private midiConnectionService: MidiConnectionService,
    private cd: ChangeDetectorRef
  ) { }

  ngOnInit() {
    // subscriptions

    // TODO: make ports themselves subscribeable and filter to get the data, then -> async pipe?
    this.midiConnectionService.ports$.subscribe( ports => {
      this.inputPorts = ports.inputPorts.length;
      this.outputPorts = ports.outputPorts.length;
      this.cd.detectChanges();
    });

    this.midiConnectionService.inputMessages$.subscribe ( message => {
      this.inputIndicator.trigger();
      this.cd.detectChanges();
    });

    this.midiConnectionService.outputMessages$.subscribe ( message => {
      this.outputIndicator.trigger();
      this.cd.detectChanges();
    });
  }

  panic() {
    this.midiConnectionService.sendGlobalNoteOff();
  }
}
