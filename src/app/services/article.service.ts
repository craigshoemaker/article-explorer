import { Injectable } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { ArticleReader } from '../modules/articleReader/articleReader';
import { ArticleInfo } from '../modules/articleInfo';

@Injectable()
export class ArticleService {

  constructor() { }

  getArticles(name:string, path: string): Observable<ArticleInfo> {

    return Observable.create(observer => {
        const options =  { name: name };
        ArticleReader.list(path).subscribe({
          next: info => {
            ArticleReader.read(info.path, name).then(article => {
                if(article.hasContent()){
                    observer.next(article);
                }
            });
          }
        });
      });
  }
}
