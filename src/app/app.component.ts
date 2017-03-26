import { Component } from '@angular/core';

import { MidiConnectionService } from 'app/services/midi-connection/midi-connection.service';
import { RoutingService } from 'app/services/routing/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  
  constructor(
    private connectionService: MidiConnectionService,
    private routingService: RoutingService
  ) { }

  ngOnInit(): void {

    this.connectionService.connectDevices().then(() => {
      // this.connectionService.pingDevice();
    });

    // Testing Routes
    let routes = [
      '#f44336',
      '#9c27b0',
      '#3f51b5',
      '#2196f3',
      '#00bcd4',
      '#4caf50',
      '#cddc39',
      '#ffeb3b'
    ];

    routes.forEach(route => {
      this.routingService.createRoute(route);
    })
  }
}
