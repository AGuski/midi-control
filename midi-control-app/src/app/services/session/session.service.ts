import { WidgetService } from './../widget/widget.service';
import { Session } from './session.model';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  sessions: Session[] = [];
  currentSession;

  constructor(private widgetService: WidgetService) { }

  getCurrentSession() {
    return this.currentSession;
  }

  getCurrentWidgets(): any[] {
    return this.currentSession.widgets;
  }

  createNewSession() {
    // this could work better with widget service listening to the session as stream and managing widgets on subscriptions.
    if (this.currentSession) {
      this.currentSession.widgets.slice().reverse()
        .forEach(widget => {
          this.removeWidget(widget.id);
        });
    }
    this.currentSession = new Session('untitled');
  }

  loadSession() {
    this.createNewSession();
    this.currentSession = <Session>JSON.parse(window.localStorage.getItem('MC_SESSION'));
    this.currentSession.widgets.forEach(widget => {
      const componentRef = this.widgetService.createWidget(widget.type, widget.id, widget.state || {});
    });
  }

  storeSession() {
    this.getCurrentWidgets().forEach(widget => {
      widget.state = this.widgetService.getComponentState(widget.id);
    });
    window.localStorage.setItem('MC_SESSION', JSON.stringify(this.currentSession));
  }

  addWidget(options) {
    const id = this.currentSession.widgetIdCounter++;
    this.widgetService.createWidget(options.type, id, options.state || {});
    this.currentSession.widgets.push({
      id: id,
      type: options.type,
      state: options.state || {}
    });
  }

  removeWidget(id) {
    this.widgetService.deleteWidget(id);
    const index = this.currentSession.widgets.findIndex(widget => widget.id === id);
    this.currentSession.widgets.splice(index, 1);
  }

}
