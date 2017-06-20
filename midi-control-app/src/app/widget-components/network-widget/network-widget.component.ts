import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs/Rx';

import { WebsocketService } from "app/services/websocket/websocket.service";
import { SettingsService } from '../../services/settings/settings.service';
import { WidgetComponent } from 'app/widget-components/widget/widget.component';
import { NetworkService } from 'app/services/network/network.service';

@Component({
  selector: 'app-network-widget',
  templateUrl: './network-widget.component.html',
  styleUrls: ['./network-widget.component.scss'],
  providers: [WebsocketService]
})
export class NetworkWidgetComponent extends WidgetComponent implements OnInit {

  @Input() state: {
    routeInId: string;
    routeOutId: string;
    serverAddress: string;
    isSender: boolean;
    isReceiver: boolean;
  };

  wsMessages$;

  constructor(
    private websocketService: WebsocketService,
    private settingsService: SettingsService,
    private networkService: NetworkService
  ) {
    super();
  }

  ngOnInit() {
    // warum wird das assignment in widget service vorher durchgeführt?
    this.connectToDefaultServer();

    this.wsMessages$.subscribe(msg => {
      if (this.state.isReceiver) {
        console.log('Receiving Message!!');
        const messageObj = JSON.parse(msg.data);
        const message = Object.keys(messageObj).map(key => messageObj[key]);
        this.toOutgoing(message);
      }
    });
  }

  setSender({checked}) {
    this.state.isSender = checked;
  }

  setReceiver({checked}) {
    this.state.isReceiver = checked;
  }

  onIncoming(data) {
    this.toOutgoing(data); // <-- send-thru default? (better: add bypass button to widgets)
    if (this.state.isSender) {
      this.wsMessages$.next(data);
    }
  }

  clientChangeServerAddress(address) {
    this.wsMessages$ = this.websocketService.connect(address);
  }

  private connectToDefaultServer() {
    if (!this.state.serverAddress) {
      this.state.serverAddress = this.settingsService.getDefaultServerAddress();
    }
    if (this.state.serverAddress) {
      this.wsMessages$ = this.websocketService.connect(this.state.serverAddress);
    } else {
      this.wsMessages$ = new Subject();
    }
  }
}
