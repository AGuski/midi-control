import { Injectable } from '@angular/core';

import { MidiConnectionService } from 'app/services/midi-connection/midi-connection.service';
import { MidiPort } from './midi-port.class';

/**
 * The midi-io-service gets ports from the midi-connection-service,
 * maps them to a setting and offers functionality to the ui app.
 *
 */

@Injectable()
export class MidiPortService {

  constructor(
    private midiConnectionService: MidiConnectionService
  ) { }

  /**
   * Returns a MidiPort to interact with.
   * @param portID The id of the returned port
   * @param mappingName the name of the mapping which will be applied to the connected port
   */
  getPort(portID: string, mappingName?: string): MidiPort {
    let deviceMapping = undefined;
    
    if(mappingName){
      // load device mapping here
      //deviceMapping = 
    }

    let port = this.midiConnectionService.getPorts().find(
      io => io.id === portID
    );
    try {
      return new MidiPort(this.midiConnectionService, port, deviceMapping);
    } catch(error) {
      alert('Trying to connect to non-existing port. ID: '+portID);
    }
  }
}
