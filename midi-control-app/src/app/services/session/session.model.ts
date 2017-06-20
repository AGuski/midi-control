export class Session {
  widgetIdCounter = 0;
  widgets: {
    id: number;
    type: string;
    state?: {any};
    inputRouteId?: number;
    outputRouteId?: number;
  }[] = [];

  constructor(public name: string) { }

}
