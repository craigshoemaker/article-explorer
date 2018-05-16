import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface Message {
  type: string;
  payload: any;
}

type MessageCallback = (payload: any) => void;

@Injectable()
export class MessageService {
  private handler = new Subject<Message>();
  messages$ = this.handler.asObservable();

  broadcast(type: string, payload: any) {
    this.handler.next({ type, payload });
  }
}
