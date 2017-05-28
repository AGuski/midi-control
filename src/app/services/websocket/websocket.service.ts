import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  private subject: Subject<MessageEvent>;
  private ws;

  constructor() { }

  // connect to server (and create socket, if not exists)
  connect(address): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(address);
    } else {
      this.disconnect();
      this.subject = this.create(address);
    }
    console.log(`Successfully connected to websocket server: ${address}`);
    return this.subject;
  }
  // create socket
  private create(address) {

    this.ws = new WebSocket(`ws://${address}`);

    // create the observable
    const observable = Observable.create((obs: Observer<MessageEvent>) => {
        this.ws.onmessage = obs.next.bind(obs);
        this.ws.onerror = obs.error.bind(obs);
        this.ws.onclose = obs.complete.bind(obs);
        return this.ws.close.bind(this.ws);
      }
    );

    // create the observer (function to call)
    const observer = {
      next: data => {
        if (this.ws.readyState === WebSocket.OPEN) {
          this.ws.send(JSON.stringify(data));
        }
      }
    };

    return Subject.create(observer, observable);
  }

  disconnect() {
    if (this.subject) {
      this.ws.close();
    }
  }
}
