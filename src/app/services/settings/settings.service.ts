import { Injectable } from '@angular/core';

/**
 * service to manage access to persistent app settings.
 */

const KEYS = {
  DEFAULT_SERVER_ADDRESS: 'MC_DEFAULT_SERVER_ADDRESS'
}

@Injectable()
export class SettingsService {

  constructor() { }

  setItem(key: string, value: string): void {
    window.localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return window.localStorage.getItem(key);
  }

  getDefaultServerAddress(): string {
    return window.localStorage.getItem(KEYS.DEFAULT_SERVER_ADDRESS);
  }

  setDefaultServerAddress(value: string): void {
    window.localStorage.setItem(KEYS.DEFAULT_SERVER_ADDRESS, value);
  }


}
