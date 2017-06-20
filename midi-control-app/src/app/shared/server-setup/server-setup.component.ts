import { Component, OnInit } from '@angular/core';
import { NetworkService } from 'app/services/network/network.service';

@Component({
  selector: 'app-server-setup',
  templateUrl: './server-setup.component.html',
  styleUrls: ['./server-setup.component.scss']
})
export class ServerSetupComponent implements OnInit {

  showSetup = false;

  localIpAddress: string;

  serverAddress: string;

  constructor(private networkService: NetworkService) { }

  ngOnInit() {
    if(this.networkService.isServer()) {
      this.localIpAddress = this.networkService.getOwnIp();
    } else {
      this.serverAddress = localStorage.getItem('serverAddress');
      // localStorage.setItem('serverAddress', '192.168.178.20:8080');
    }
  }

  clientChangeServerAddress(address) {
    this.networkService.setServerAddress(address);
  }
}
