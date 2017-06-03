import { Directive, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[appModulesLoader]'
})
export class ModulesLoaderDirective {

  @Input() area: string;

  constructor(public viewContainerRef: ViewContainerRef) { }

}
