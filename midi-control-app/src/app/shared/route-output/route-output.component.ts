import { RoutingService } from '../../services/routing/routing.service';
import { Component, Input, EventEmitter, Output, OnChanges } from '@angular/core';

@Component({
  selector: 'app-route-output',
  templateUrl: './route-output.component.html',
  styleUrls: ['./route-output.component.scss']
})
export class RouteOutputComponent implements OnChanges {

  @Input() routeId: string;
  @Output() routeIdChange = new EventEmitter<string>();
  @Input() outgoingData$: any;

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
    this.subscription = this.outgoingData$
      .subscribe(data => {
        this.routingService.getRoute(id).getSubject()
          .next(data);
      });
    this.routeIdChange.emit(id);
  }
}
