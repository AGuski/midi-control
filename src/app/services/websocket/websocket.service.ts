import { Injectable } from '@angular/core';
import { Observable, Observer, Subject } from 'rxjs/Rx';

@Injectable()
export class WebsocketService {

  private subject: Subject<MessageEvent>;

  constructor() { }

  // connect to server (and create socket, if not exists)
  connect(address): Subject<MessageEvent> {
    if (!this.subject) {
      this.subject = this.create(address);
      console.log(`Successfully connected to websocket server: ${address}`);
    }
    return this.subject;
  }
  // create socket
  private create(address) {

    console.log(localStorage.getItem('serverAddress'));

    let ws = new WebSocket(`ws://${address}`);
    
    // create the observable
    let observable = Observable.create((obs: Observer<MessageEvent>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      }
    );
    
    // create the observer (function to call)
    let observer = {
      next: data => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
    }

    return Subject.create(observer, observable);
  }
}
