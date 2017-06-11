interface ConnectionCallbacks {
  onMessage: Function;
  onStateChange: Function;
}

export class MidiConnection implements ConnectionCallbacks {

    private midiAccess: WebMidi.MIDIAccess;
    public inputPorts: WebMidi.MIDIPort[];
    public outputPorts: WebMidi.MIDIPort[];
    public sendMessage: Function;
    public onMessage: Function;
    public onStateChange: Function;

  constructor() { }

  connect(): Promise<MidiConnection> {
    return new Promise((resolve, reject) => {
      if (navigator.requestMIDIAccess) {

        const accessOptions = {
          sysex: false, // <-- request sysEx access
          software: false // <-- request software synth access (need to test)
        };

        navigator.requestMIDIAccess(accessOptions).then((midiAccess: WebMidi.MIDIAccess) => {
          this.midiAccess = midiAccess;
          console.log('MIDI Connection established.');
          this.readInputs(midiAccess);
          this.createOutputs(midiAccess);
          this.mapInputsAndOutputs(midiAccess);

          // connection state changes
          midiAccess.onstatechange = $event => {
            this.mapInputsAndOutputs(midiAccess);
            this.onStateChange($event);
          };

          resolve(this);
        }, () => {
          reject('The MIDI system failed to start.');
        });
      } else {
        reject('Browser has no MIDI support.');
      }
    });
  }

  isSysexEnabled(): boolean {
    return this.midiAccess.sysexEnabled;
  }

  private readInputs(midiAccess: WebMidi.MIDIAccess): void {
    const inputs = midiAccess.inputs.values();
    for ( let input = inputs.next(); input && !input.done; input = inputs.next()) {
      input.value.onmidimessage = $event => {
        this.onMessage($event);
      };
    }
  }

  private createOutputs(midiAccess: WebMidi.MIDIAccess): void {
    // can send to all or selective by portID
    this.sendMessage = ({message, portID}) => {
      const output = portID ?
        midiAccess.outputs.get(portID) :
        midiAccess.outputs.values().next().value;
      output.send(message);
    };
  }

  private mapInputsAndOutputs(midiAccess: WebMidi.MIDIAccess): void {
    this.inputPorts = [];
    this.outputPorts = [];

    midiAccess.inputs.forEach((port, key) => {
      this.inputPorts.push(port);
    });
    midiAccess.outputs.forEach((port, key) => {
      this.outputPorts.push(port);
    });
  }
}
