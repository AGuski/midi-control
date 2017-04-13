import { Component, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class SideMenuComponent {

  @ViewChild('sidenav') sidenav: any;

  toggle() {
    this.sidenav.toggle();
  }
}
