import { Injectable } from '@angular/core';
import { BehaviorSubject, EMPTY } from 'rxjs';
import {
  catchError,
  distinctUntilChanged,
  filter,
  finalize,
  mergeMap,
  scan,
  shareReplay,
  switchMap
} from 'rxjs/operators';
import { Article } from '../modules/articleReader/article.model';
import { ArticleReader } from '../modules/articleReader/articleReader';
import { ArticleArguments, Message, MessageService } from './message.service';
import { MessageEventTypes } from './messageEventTypes';

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
          case MessageEventTypes.NameChanged:
            return { ...acc, name: message.payload.name.trim() };
          case MessageEventTypes.PathChanged:
            return { ...acc, path: message.payload.path.trim() };
        }
      },
      {} as ArticleArguments
    )
  );

  isLoading$ = new BehaviorSubject(false);

  articles$ = this.configFromMessages$.pipe(
    distinctUntilChanged(
      (orig, changed) => JSON.stringify(orig) === JSON.stringify(changed)
    ),
    switchMap(({ name, path }) => {
      this.isLoading$.next(true);
      if (name && path) {
        return this.articleReader.articleInfo(path).pipe(
          mergeMap(info => this.articleReader.read(info.path)),
          filter(article => article.metadata.github === name),
          // Now turn it into Observble<Article[]>
          scan((acc, article: Article) => [...acc, article], []),
          catchError(err => EMPTY),
          finalize(() => {
            // Promise.resolve(true);
            // setTimeout(() => {}, 10);
            return this.isLoading$.next(false);
          })
        );
      }
      this.isLoading$.next(false);
      return EMPTY;
    }),
    shareReplay(1)
  );
}
