export class Session {
  moduleIdCounter = 0;
  modules: {
    id: number;
    type: string;
    state?: {any};
    inputRouteId?: number;
    outputRouteId?: number;
  }[] = [];

  constructor(public name: string) { }

}
