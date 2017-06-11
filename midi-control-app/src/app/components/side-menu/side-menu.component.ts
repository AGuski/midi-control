import { ModuleService } from './../../services/module/module.service';
import { SettingsService } from './../../services/settings/settings.service';
import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';
import { SessionService } from "app/services/session/session.service";

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;

  defaultServerAddress: string;

  constructor(
    private settingsService: SettingsService,
    private sessionService: SessionService,
    private moduleService: ModuleService
  ) { }

  ngOnInit() {
    this.defaultServerAddress = this.settingsService.getDefaultServerAddress();
  }

  toggle() {
    this.sidenav.toggle();
  }

  clientChangeDefaultServerAddress(address) {
    this.settingsService.setDefaultServerAddress(address);
  }

  debugLogCurrentSession() {
    console.log(this.sessionService.getCurrentSession());
  }

  debugLogModuleComponents() {
    console.log(this.moduleService.getComponentRefs());
  }
}
