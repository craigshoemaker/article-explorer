import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

export interface ArticleArguments {
  name?: string;
  path?: string;
}

export interface Message {
  type: string;
  payload: ArticleArguments;
}

type MessageCallback = (payload: ArticleArguments) => void;

@Injectable()
export class MessageService {
  private handler = new ReplaySubject<Message>();
  messages$ = this.handler.asObservable();

  broadcast(type: string, payload: ArticleArguments) {
    this.handler.next({ type, payload });
  }
}