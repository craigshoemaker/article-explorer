import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscription, of, from } from 'rxjs';

import { ArticleReader } from '../modules/articleReader/articleReader';
import { ArticleInfo } from '../modules/articleInfo';

import { mergeMap, filter, catchError, map } from 'rxjs/operators';

@Injectable()
export class ArticleService {

  constructor(private zone: NgZone) { }

  // getArticles(name: string, path: string): Observable<ArticleReader> {

  //   return Observable.create(observer => {
  //     const options = { name: name };
  //     ArticleReader.list(path).subscribe({
  //       next: info => {
  //         ArticleReader.read(info.path, options).then(article => {
  //           this.zone.run(() => {
  //             if (article.hasContent()) {
  //               observer.next(article);
  //             }
  //           });
  //         });
  //       },
  //       error: err => observer.error(err),
  //       complete: () => observer.complete()
  //     });
  //   });
  // }

  getArticles(name: string, path: string): Observable<ArticleReader> {
    return ArticleReader.list(path).pipe(
      mergeMap(info => from(ArticleReader.read(info.path, { name: name }))),
      filter(reader => reader.hasContent())
      // mergeMap(reader => of((reader))
      // catchError(err => {
      //   // do something, if you want
      // })
    );
  }
}
