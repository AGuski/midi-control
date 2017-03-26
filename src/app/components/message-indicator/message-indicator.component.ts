import { Component, EventEmitter, Input, Output, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-message-indicator',
  templateUrl: './message-indicator.component.html',
  styleUrls: ['./message-indicator.component.scss']
})
export class MessageIndicatorComponent {

  ////////////////// USE ASYNC PIPE!!!!!!!!!!!!!!!!!! //////////////////

  @Input() trigger: boolean;

  signal: boolean;

  constructor(private cd: ChangeDetectorRef ) { }

  ngOnChanges($event) {
    if($event.trigger.isFirstChange()) {
      return;
    }
    
    this.signal = true;
    setTimeout(() => {
      this.signal = false;
      this.cd.detectChanges();
    }, 100);
  }
}

