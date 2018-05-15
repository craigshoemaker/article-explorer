import { Injectable } from '@angular/core';
import { MessageService } from './message.service';
import { MessageEventTypes } from './messageEventTypes';

@Injectable()
export class PathService {

    getPath() {
        return window.localStorage.getItem('path');
    }

    changePath(path) {
        window.localStorage.setItem('path', path);
        this.messageService.broadcast(MessageEventTypes.PathChanged, { path: path });
    }

    constructor(private messageService: MessageService) { }
}
