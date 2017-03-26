import { Injectable } from '@angular/core';
import { Subject, BehaviorSubject } from 'rxjs';

import { MidiConnection } from './midi-connection';
import { MidiMessage } from './midi-message.class';

/* Filters out midimessage from getting into the system */
const BLACKLIST = [
  [254] // <-- active sensing message
];

/**
 * The midi-connection-service uses a custom implementation (midiConnection.js) to
 * communicate via Web MIDI API with connected MIDI devices. It will be used once
 * to establish connection with all devices.
 * Then, all created Input outputs use its methods to communicate with the midi-connection.
 * 
 * Think about usage of RxJS subject/observables and discuss in BA.
 * 
 */

@Injectable()
export class MidiConnectionService {

  midiConnection: MidiConnection;

  inputMessages$: Subject<WebMidi.MIDIMessageEvent>;
  outputMessages$: Subject<MidiMessage>;
  ports$: BehaviorSubject<{
    inputPorts: WebMidi.MIDIPort[],
    outputPorts: WebMidi.MIDIPort[]
  }>;

  constructor() {
    this.inputMessages$ = new Subject();
    this.outputMessages$ = new Subject();
    this.ports$ = new BehaviorSubject({
      inputPorts: [],
      outputPorts: []
    });
  }
  
  /**
   * Creates a new midiConnection with the User Agents WebMIDI interface.
   * Returns a promise containing the midiConnection.
   */
  connectDevices(): Promise<MidiConnection> {
    return new Promise((resolve, reject) => {
      this.midiConnection = new MidiConnection();
      this.midiConnection.connect().then(() => {
        this.emitPorts();

        // On MIDI Input message --> needs to receive ALL inputs 
        // for global stuff (logging or ui indicator on input);
        this.midiConnection.onMessage = $event => {
          // Unfiltered Input handling goes here...

          if (this.messageFilter($event.data, BLACKLIST)){
            this.inputMessages$.next($event);
          }
        }

        this.midiConnection.onStateChange = $event => {
          this.emitPorts();
        }        

        resolve(this.midiConnection);
      }).catch( error => {
        // alert error here for now, but maybe pass it thru for other uses.
        // reject(error);
        alert(error);
      });
    });
  }

  /**
   * sends a message to all connected outputs
   */
  send(message: MidiMessage): void {
    console.log(message);
    this.midiConnection.sendMessage(message);
    this.outputMessages$.next(message);
  }

  /**
   * Returns the underlying MidiConnection
   */
  getConnection(): MidiConnection {
    return this.midiConnection;
  }

  /**
   * Returns all connected MIDIports.
   */
  getPorts(): WebMidi.MIDIPort[] {
    return this.getInputPorts().concat(this.getOutputPorts());
  }

  /**
   * Returns all connected input MIDIports.
   */
  getInputPorts(): WebMidi.MIDIPort[] {
    return this.midiConnection.inputPorts;
  }

  /**
   * Returns all connected output MIDIports.
   */
  getOutputPorts(): WebMidi.MIDIPort[] {
    return this.midiConnection.outputPorts;
  }

  private emitPorts() {
    this.ports$.next({
      inputPorts: this.getInputPorts(),
      outputPorts: this.getOutputPorts()
    });
  }

  private messageFilter(data: number[], blacklist: any[]) {
    let shallPass = false;
    blacklist.forEach(blacklistData => {
      blacklistData.forEach((value, index) => {
        if (data[index] !== value) {
          shallPass = true;
        }
      });
    })
    return shallPass;
  }

  /**
   * Connect output to input and input to MIDI-thru of an output device. 
   * Useful for comparison of devices and API latency.
   */
  pingDevice():void {
    let delta = window.performance.now();
    console.log('executing ping...');
    this.send({message: [0x90, 66, 0x7f]});

    this.inputMessages$.subscribe(() => {
      console.log('ping took ', window.performance.now()-delta, ' milliseconds.');
    });
  }

}