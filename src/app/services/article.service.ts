import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import {
  filter,
  finalize,
  mergeMap,
  scan,
  shareReplay,
  switchMap
} from 'rxjs/operators';
import { Article } from '../modules/articleReader/article.model';
import { ArticleReader } from '../modules/articleReader/articleReader';
import { Message, MessageService } from './message.service';
import { MessageEventTypes } from './messageEventTypes';

interface Config {
  user: string;
  path: string;
}

@Injectable()
export class ArticleService {
  constructor(
    private articleReader: ArticleReader,
    private messageService: MessageService
  ) {}

  private configFromMessages$ = this.messageService.messages$.pipe(
    scan(
      (acc, message: Message) => {
        switch (message.type) {
          case MessageEventTypes.UserChanged:
            return { ...acc, user: message.payload.name.trim() };
          case MessageEventTypes.PathChanged:
            return { ...acc, path: message.payload.path.trim() };
        }
      },
      {} as Config
    )
  );

  isLoading$ = new BehaviorSubject(false);

  articles$ = this.configFromMessages$.pipe(
    switchMap(({ user, path }) => {
      this.isLoading$.next(true);
      if (user && path) {
        return this.articleReader.articleInfo(path).pipe(
          mergeMap(info => this.articleReader.read(info.path)),
          filter(article => article.metadata.github === user),
          // Now turn it into Observble<Article[]>
          scan((acc, article: Article) => [...acc, article], []),
          finalize(() => this.isLoading$.next(false))
        );
      }
      this.isLoading$.next(false);
      return EMPTY;
    }),
    shareReplay(1)
  );
}
