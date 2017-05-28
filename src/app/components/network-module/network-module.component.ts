import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { WebsocketService } from "app/services/websocket/websocket.service";
import { SettingsService } from '../../services/settings-service/settings.service';
import { RoutingService } from "app/services/routing/routing.service";
import { ModuleComponent } from "app/components/module/module.component";
import { NetworkService } from 'app/services/network/network.service';

@Component({
  selector: 'app-network-module',
  templateUrl: './network-module.component.html',
  styleUrls: ['./network-module.component.scss'],
  providers: [WebsocketService]
})
export class NetworkModuleComponent extends ModuleComponent implements OnInit {

  ///// TODO: Try to use Decorators instead of inheriting an abstract component

  wsMessages$;

  serverAddress: string;
  isSender = false;
  isReceiver = false;

  constructor(
    private websocketService: WebsocketService,
    private settingsService: SettingsService,
    private networkService: NetworkService,
    routingService: RoutingService
  ) {
    super(routingService);
  }

  ngOnInit() {
    this.connectToDefaultServer();

    this.wsMessages$.subscribe(msg => {
      if (this.isReceiver) {
        console.log('Receiving Message!!');
        const messageObj = JSON.parse(msg.data);
        const message = Object.keys(messageObj).map(key => messageObj[key]);
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
    this.toRouteOut(data); // <-- send-thru default? (better: add bypass button to modules)
    if (this.isSender) {
      this.wsMessages$.next(data);
    }
  }

  clientChangeServerAddress(address) {
    this.wsMessages$ = this.websocketService.connect(address);
  }

  private connectToDefaultServer() {
    this.serverAddress = this.settingsService.getDefaultServerAddress();
    if (this.serverAddress) {
      this.wsMessages$ = this.websocketService.connect(this.serverAddress);
    } else {
      this.wsMessages$ = new Subject();
    }
  }

}
