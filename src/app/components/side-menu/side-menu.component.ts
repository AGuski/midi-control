import { SettingsService } from './../../services/settings-service/settings.service';
import { Component, ViewEncapsulation, ViewChild, ElementRef, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent implements OnInit {

  @ViewChild('sidenav') sidenav: any;

  defaultServerAddress: string;

  constructor(private settingsService: SettingsService) { }

  ngOnInit() {
    this.defaultServerAddress = this.settingsService.getDefaultServerAddress();
  }

  toggle() {
    this.sidenav.toggle();
  }

  clientChangeDefaultServerAddress(address) {
    this.settingsService.setDefaultServerAddress(address);
  }
}
