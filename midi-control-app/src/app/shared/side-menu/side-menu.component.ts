import { WidgetService } from './../../services/widget/widget.service';
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
    private widgetService: WidgetService
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

  debugLogWidgetComponents() {
    console.log(this.widgetService.getComponentRefs());
  }
}
