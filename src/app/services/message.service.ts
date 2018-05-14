import { Injectable } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

interface Message {
  type: string;
  payload: any;
}

type MessageCallback = (payload: any) => void;

@Injectable()
export class MessageService {

  private handler = new Subject<Message>();

  broadcast(type: string, payload: any) {
    this.handler.next({ type, payload });
  }

  subscribe(type: string, callback: MessageCallback): Subscription {
      const onlyWithMatchingType = filter<Message>(m => m.type === type);
      const mapValue = map<Message, any>(m => m.payload);
      return this.handler.pipe(onlyWithMatchingType, mapValue).subscribe(callback);
  }

}
