import { Component, OnInit, Input } from '@angular/core';

import { WebsocketService } from "app/services/websocket/websocket.service";
import { RoutingService } from "app/services/routing/routing.service";
import { ModuleComponent } from "app/components/module/module.component";

@Component({
  selector: 'app-network-module',
  templateUrl: './network-module.component.html',
  styleUrls: ['./network-module.component.scss'],
  providers: [WebsocketService]
})
export class NetworkModuleComponent extends ModuleComponent implements OnInit {

  ///// TODO: Try to use Decorators instead of inheriting an abstract component

  wsMessages$;

  isSender = false;
  isReceiver = false;

  constructor(
    private websocketService: WebsocketService,
    routingService: RoutingService
  ) { 
    super(routingService);
  }

  ngOnInit() {
    this.wsMessages$ = this.websocketService.connect('192.168.178.20:8080'); // Find a way to reconnect to a different address.

    this.wsMessages$.subscribe(msg => {
      if (this.isReceiver) {
        console.log('Receiving Message!!');
        let messageObj = JSON.parse(msg.data);
        let message = Object.keys(messageObj).map(key => messageObj[key]);
        this.toRouteOut(message);
      }
    });
  }

  onRouteInSelection($event) {
    this.setInputRoute($event);
  }

  onRouteOutSelection($event) {
    this.setOutputRoute($event);
  }

  setSender({checked}) {
    this.isSender = checked;
  }

  setReceiver({checked}) {
    this.isReceiver = checked;
  }

  onIncoming(data) {
    this.toRouteOut(data); //<-- send-thru default?
    if (this.isSender) {
      this.wsMessages$.next(data);
    }
  }

}
