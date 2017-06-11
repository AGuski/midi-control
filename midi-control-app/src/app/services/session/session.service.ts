import { ModuleService } from './../module/module.service';
import { Session } from './session.model';
import { Injectable } from '@angular/core';

@Injectable()
export class SessionService {

  sessions: Session[] = [];
  currentSession;

  constructor(private moduleService: ModuleService) { }

  getCurrentSession() {
    return this.currentSession;
  }

  getCurrentModules() {
    return this.currentSession.modules;
  }

  createNewSession() {
    // this could work better with module service listening to the session as stream and managing modules on subscriptions.
    if (this.currentSession) {
      this.currentSession.modules.slice().reverse()
        .forEach(module => {
          this.removeModule(module.id);
        });
    }
    this.currentSession = new Session('untitled');
  }

  loadSession() {
    // remove old session components
    this.currentSession = <Session>JSON.parse(window.localStorage.getItem('MC_SESSION'));
    this.currentSession.modules.forEach(module => {
      const componentRef = this.moduleService.createModule(module.type, module.id, module.state || {});
    });
  }

  storeSession() {
    window.localStorage.setItem('MC_SESSION', JSON.stringify(this.currentSession));
  }

  addModule(options) {
    const id = this.currentSession.moduleIdCounter++;
    this.moduleService.createModule(options.type, id, options.state || {});
    this.currentSession.modules.push({
      id: id,
      type: options.type,
      state: options.state || {},
      inputRouteId: options.inputRouteId,
      outputRouteId: options.outputRouteId
    });
  }

  removeModule(id) {
    this.moduleService.deleteModule(id);
    const index = this.currentSession.modules.findIndex(module => module.id === id);
    this.currentSession.modules.splice(index, 1);
  }

}
