import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appWidgetsLoader]'
})
export class WidgetsLoaderDirective {

  @Input() area: string;

  constructor(public viewContainerRef: ViewContainerRef) { }

}
