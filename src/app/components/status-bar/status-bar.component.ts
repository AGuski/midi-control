import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MidiConnectionService } from '../../services/midi-connection/midi-connection.service';

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

  inputPorts: number;
  outputPorts: number;

  inputIndicatorTrigger = false;
  outputIndicatorTrigger = false;

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
      this.inputIndicatorTrigger = !this.inputIndicatorTrigger;
      this.cd.detectChanges();
    });

    this.midiConnectionService.outputMessages$.subscribe ( message => {
      this.outputIndicatorTrigger = !this.outputIndicatorTrigger;
      this.cd.detectChanges();
    });
  }
}
