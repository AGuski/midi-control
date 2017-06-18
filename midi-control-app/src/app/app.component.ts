import { ModuleService } from './services/module/module.service';
import { ModulesLoaderDirective } from './directives/modules-loader/modules-loader.directive';
import { SessionService } from './services/session/session.service';
import { Component, OnInit, ViewChildren, QueryList } from '@angular/core';

import { MidiConnectionService } from 'app/services/midi-connection/midi-connection.service';
import { RoutingService } from 'app/services/routing/routing.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  @ViewChildren(ModulesLoaderDirective) modulesLoaders: QueryList<ModulesLoaderDirective>;

  areas;

  constructor(
    private connectionService: MidiConnectionService,
    private routingService: RoutingService,
    private sessionService: SessionService,
    private moduleService: ModuleService
  ) { }


  ngOnInit(): void {

    this.sessionService.createNewSession();

    this.connectionService.connectDevices().then(() => {
      // this.connectionService.pingDevice();
    });

    // Testing Routes
    const routes = [
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
    });
  }

  ngAfterViewInit() {
    this.loadModuleComponents();
  }

  loadModuleComponents() {
    if (!this.areas) {
      this.areas = this.modulesLoaders.toArray();
    }

    this.moduleService.assignContainers({
      input: this.areas[0],
      control: this.areas[1],
      output: this.areas[2]
    });
  }
}
