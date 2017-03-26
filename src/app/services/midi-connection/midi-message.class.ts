/**
 * Object containing a MIDI message and optional portID. If no portID is set,
 * message will be send to all available ports.
 */
export class MidiMessage {
  message: Uint8Array | number[];
  portID?: string;
}