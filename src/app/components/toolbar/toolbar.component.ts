import { Component, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() openSettingsChange = new EventEmitter<boolean>();

  openSettings = false;

  toggleSettings() {
    this.openSettings = !this.openSettings
    this.openSettingsChange.emit(this.openSettings);
  }

}
