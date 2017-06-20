import { Injectable, ComponentFactoryResolver, Component, Type, ComponentRef } from '@angular/core';
import { InputWidgetComponent }         from 'app/widget-components/input-widget/input-widget.component';
import { OutputWidgetComponent }        from 'app/widget-components/output-widget/output-widget.component';
import { NetworkWidgetComponent }       from 'app/widget-components/network-widget/network-widget.component';
import { SingleControlWidgetComponent } from 'app/widget-components/single-control-widget/single-control-widget.component';
import { TransposeWidgetComponent }     from 'app/widget-components/transpose-widget/transpose-widget.component';

@Injectable()
export class WidgetService {

  readonly availableWidgets = {
    inputWidget: 'INPUT',
    outputWidget: 'OUTPUT',
    networkWidget: 'NETWORK',
    singleControlWidget: 'SINGLE_CONTROL',
    transposeWidget: 'TRANSPOSE'
  };

  containers: {
    input: any;
    control: any;
    output: any;
  };

  componentRefs: {
    id: number;
    componentRef: ComponentRef<any>;
  }[] = [];

  constructor(
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  assignContainers(containers): void {
    this.containers = {
      input: containers.input,
      control: containers.control,
      output: containers.output
    };
  }

  getComponentRefs() {
    return this.componentRefs;
  }

  getComponentState(id: number): any {
    const component = this.componentRefs.find(compRef => compRef.id === id);
    return component.componentRef.instance.state;
  }

  getAvailableWidgetTypes(): string[] {
    return Object.keys(this.availableWidgets)
      .map(key => this.availableWidgets[key]);
  }

  createWidget(type: string , id: number, state: object): void {
    let componentRef;
    switch (type) {
      case 'INPUT': {
        componentRef = this.createComponent(InputWidgetComponent, this.containers.input);
        break;
      }
      case 'OUTPUT': {
        componentRef = this.createComponent(OutputWidgetComponent, this.containers.output);
        break;
      }
      case 'NETWORK': {
        componentRef = this.createComponent(NetworkWidgetComponent, this.containers.control);
        break;
      }
      case 'SINGLE_CONTROL': {
        componentRef = this.createComponent(SingleControlWidgetComponent, this.containers.control);
        break;
      }
      case 'TRANSPOSE': {
        componentRef = this.createComponent(TransposeWidgetComponent, this.containers.control);
        break;
      }
      default:
      throw(Error(`could not create widget of type: ${type}. Missing or misspelled type?`));
    }
    componentRef.instance.widgetId = id;
    componentRef.instance.state = state;
    this.componentRefs.push({
      id: id,
      componentRef: componentRef
    });
  }

  deleteWidget(id: number): void {
    const index = this.componentRefs
      .findIndex(item => item.id === id);
    this.componentRefs[index].componentRef.destroy();
    this.componentRefs.splice(index, 1);
  }

  private createComponent(componentClass: Type<{}>, container): ComponentRef<any> {
    const componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    const viewContainerRef = container.viewContainerRef;
    return viewContainerRef.createComponent(componentFactory);
  }

}
