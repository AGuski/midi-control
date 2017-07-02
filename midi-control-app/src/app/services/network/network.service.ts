import { Injectable } from '@angular/core';

import { ElectronService } from 'ngx-electron';

@Injectable()
export class NetworkService {

  constructor(private electronService: ElectronService) { }

  isServer(): boolean {
    return ElectronService.runningInElectron;
  }

  // deprecated??
  setServerAddress(address: string): void {
    localStorage.setItem('serverAddress', address);
  }

  getOwnIp(): string {
    if (this.isServer) {
      let os = this.electronService.remote.require('os');
      let ifaces = os.networkInterfaces();
      let ipAddress = '';

      Object.keys(ifaces).forEach(ifname => {
        var alias = 0;

        ifaces[ifname].forEach(iface => {
          if ('IPv4' !== iface.family || iface.internal !== false) {
            // skip over internal (i.e. 127.0.0.1) and non-ipv4 addresses
            return;
          }
          if (alias >= 1) {
            // this single interface has multiple ipv4 addresses
            console.log(ifname + ':' + alias, iface.address);
          } else {
            // this interface has only one ipv4 adress
            ipAddress = iface.address;
          }
          ++alias;
        });
      });
      return ipAddress;
    } else {
      throw('Can not return IP address. This is not an nodejs environment.');
    }
  }
}
