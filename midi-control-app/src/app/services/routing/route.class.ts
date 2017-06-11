import { Subject } from 'rxjs';

export class Route {

  id: string;

  subject: Subject<any>

  constructor(id) {
    this.id = id;
    this.subject = new Subject();
  }

  send(value){
    this.subject.next(value);
  }

  getSubject() {
    return this.subject;
  }

}