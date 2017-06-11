import { Injectable, ComponentFactoryResolver, Component, Type, ComponentRef } from '@angular/core';
import { InputModuleComponent } from "app/components/input-module/input-module.component";
import { OutputModuleComponent } from "app/components/output-module/output-module.component";
import { NetworkModuleComponent } from "app/components/network-module/network-module.component";
import { SingleControlModuleComponent } from "app/components/single-control-module/single-control-module.component";

@Injectable()
export class ModuleService {

  readonly availableModules = {
    inputModule: 'INPUT',
    outputModule: 'OUTPUT',
    networkModule: 'NETWORK',
    singleControlModule: 'SINGLE_CONTROL'
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

  getComponentState(id) {

  }

  getAvailableModuleTypes(): string[] {
    return Object.keys(this.availableModules)
      .map(key => this.availableModules[key]);
  }

  createModule(type: string , id: number, state: object): void {
    let componentRef;
    switch (type) {
      case 'INPUT': {
        componentRef = this.createComponent(InputModuleComponent, this.containers.input);
        break;
      }
      case 'OUTPUT': {
        componentRef = this.createComponent(OutputModuleComponent, this.containers.output);
        break;
      }
      case 'NETWORK': {
        componentRef = this.createComponent(NetworkModuleComponent, this.containers.control);
        break;
      }
        case 'SINGLE_CONTROL': {
        componentRef = this.createComponent(SingleControlModuleComponent, this.containers.control);
        break;
      }
      default:
      throw(Error(`could not create module of type: ${type}. Missing or misspelled type?`));
    }
    componentRef.instance.moduleId = id;
    componentRef.instance.state = state;
    this.componentRefs.push({
      id: id,
      componentRef: componentRef
    });
  }

  deleteModule(id: number): void {
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
