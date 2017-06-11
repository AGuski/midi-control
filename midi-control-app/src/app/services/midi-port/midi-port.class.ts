import { Subject } from "rxjs/Rx";

import { MidiConnectionService } from 'app/services/midi-connection/midi-connection.service';

/**
 * Class to instantiate a MIDI in- and/or output.
 * Basically singles out an input or output from the midi-connection 
 * and allows operations on it.
 * Gets called by midi-port-service.
 */

export class MidiPort {
  port: WebMidi.MIDIPort;
  id: string;

  messages$: Subject<{}>;

  /**
   * Constructs an instance of the MidiPort class.
   * @param midiConnectionService The singleton service that interfaces to the MIDI connection.
   * @param port A single input or output port from the MIDIAccess ports.
   * @param mapping A mapping serving as an interface between MIDI Messages and the internal model.
   */
  constructor(private midiConnectionService: MidiConnectionService, port: WebMidi.MIDIPort, mapping: any) {
    this.port = port;
    this.id = port.id;
    this.messages$ = new Subject();

    if (this.port.type === 'input') { 

      // mapping translation in here

      this.midiConnectionService.inputMessages$
        .filter((message: any) => message.target.id === this.id)
        .pluck('data') // <<---- mapping goes here

        /* data[0] -> status byte (type of message)
           data[1 to n] -> data bytes

           2-Step mapping (1. Uint8Array to MidiObject (todo), 2. MidiObject to semantic internal mapping)

           process (Uint8Array to MidiObject):
           1. Go throu map to identify status byte/message type
           2. After id'ing create object of sub-keys belonging to message type (e.g. note on -> subkeys: note, velocity)

           process (MidiObject to internal model):
           1. internal model: {name, min, max, step} 


        */ 

        .subscribe(this.messages$);
    } else if (this.port.type === 'output') {
      this.midiConnectionService.outputMessages$
        .filter(message => message.portID === this.id)
        .subscribe(this.messages$);
    }
  }

  subscribe(fn) {
    return this.messages$.subscribe(fn);
  }

  getName() {
    return this.port.name;
  }

  getManufacturer() {
    return this.port.manufacturer;
  }
  
  send(data) {
    // use output mapping here
    this.midiConnectionService.send({message: data, portID: this.id});
  }
}