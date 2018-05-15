import { Injectable, NgZone } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ArticleReader } from '../modules/articleReader/articleReader';
import { ArticleInfo } from '../modules/articleInfo';

@Injectable()
export class ArticleService {

  constructor(private zone: NgZone) { }

  getArticles(name:string, path: string): Observable<ArticleReader> {

    return Observable.create(observer => {
        const options =  { name: name };
        ArticleReader.list(path).subscribe({
          next: info => {
            ArticleReader.read(info.path, options).then(article => {
                this.zone.run(() => {
                    if(article.hasContent()){
                        observer.next(article);
                    }
                });
            });
          },
          error: err => observer.error(err),
          complete: () => observer.complete()
        });
      });
  }
}
