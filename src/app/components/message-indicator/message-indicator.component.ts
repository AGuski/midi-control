import { Component, EventEmitter, Input, Output, ChangeDetectorRef, ComponentRef } from '@angular/core';

@Component({
  selector: 'app-message-indicator',
  templateUrl: './message-indicator.component.html',
  styleUrls: ['./message-indicator.component.scss']
})
export class MessageIndicatorComponent {

  private active: boolean;

  constructor(private cd: ChangeDetectorRef ) { }

  trigger() {
    this.active = true;
    setTimeout(() => {
      this.active = false;
      this.cd.detectChanges();
    }, 100);
  };
}

