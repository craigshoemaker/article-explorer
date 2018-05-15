import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Http } from '@angular/http';
import { MessageService } from './message.service';
import { MessageEventTypes } from './messageEventTypes';

const httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class UserInfoService {

  constructor(private http: Http, 
              private messageService: MessageService) { }

  changeLogin(name: string) {
    window.localStorage.setItem('login', name);
    this.messageService.broadcast(MessageEventTypes.UserChanged, { name: name });
  }

  getLogin() {
    const login = window.localStorage.getItem('login') ? 
                  window.localStorage.getItem('login') : 
                  'microsoft';
    return login;
  }

  getInfo(): any {
    return this.http.get(`https://api.github.com/users/${ this.getLogin() }`);
  }

}
