import { Injectable } from '@angular/core';

@Injectable()
export class LocalStorageService {

  constructor() { }

  // TODO: Add Functionality to subscribe to changing values;

  setItem(key: string, value:string): void {
    window.localStorage.setItem(key, value);
  }

  getItem(key: string): string {
    return window.localStorage.getItem(key);
  }

}
