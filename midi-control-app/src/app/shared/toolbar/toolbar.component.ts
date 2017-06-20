import { WidgetService } from './../../services/widget/widget.service';
import { SessionService } from './../../services/session/session.service';
import { Component, EventEmitter,Output } from '@angular/core';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

  @Output() openSettingsChange = new EventEmitter<boolean>();

  openSettings = false;

  constructor(
    private sessionService: SessionService,
    private widgetService: WidgetService
  ) { }

  toggleSettings() {
    this.openSettings = !this.openSettings;
    this.openSettingsChange.emit(this.openSettings);
  }

  newSession() {
    this.sessionService.createNewSession();
  }

  saveSession() {
    this.sessionService.storeSession();
  }

  loadSession() {
    this.sessionService.loadSession();
  }

  addWidget(widgetType: string) {
    this.sessionService.addWidget({type: widgetType});
  }

}
