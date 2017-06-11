import { Component, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { RoutingService } from 'app/services/routing/routing.service';

@Component({
  selector: 'app-route-input',
  templateUrl: './route-input.component.html',
  styleUrls: ['./route-input.component.scss']
})
export class RouteInputComponent implements OnChanges {

  @Input() routeId: string;
  @Output() routeIdChange = new EventEmitter<string>();
  @Output() incomingData= new EventEmitter<any>();

  subscription;

  constructor(private routingService: RoutingService) { }

  ngOnChanges(changes) {
    if (changes.routeId && changes.routeId.currentValue) {
      this.setRoute(changes.routeId.currentValue);
    }
  }

  setRoute(id) {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
    this.subscription = this.routingService.getRoute(id).getSubject().subscribe(data => {
      this.incomingData.emit(data);
    });
    this.routeIdChange.emit(id);
  }

}
