import { Injectable, NgZone } from '@angular/core';
import * as LineReader from 'line-by-line';
import * as path from 'path';
import { Observable } from 'rxjs';
import * as Walk from 'walk';
import { ArticleInfo } from '../articleInfo';
import { ContentParser } from '../contentParser/contentParser';
import { MetadataParser } from '../metadataParser/metadataParser';
import { Article } from './article.model';

@Injectable()
export class ArticleReader {
  constructor(private zone: NgZone) {}

  public read(filePath: string) {
    return new Promise<Article>((resolve, reject) => {
      const reader = new LineReader(filePath, { end: 800 });
      const article = new Article();
      const data = [];
      const metadataParser = new MetadataParser();
      const contentParser = new ContentParser();

      article.filePath = filePath;

      reader.on('error', err => reject(err));
      reader.on('line', line => data.push(line));

      reader.on('end', () => {
        const contents = data.join('\n');
        article.metadata = metadataParser.parse(contents);
        article.content = contentParser.parse(contents);
        this.zone.run(() => resolve(article));
      });
    });
  }

  public articleInfo(folderPath: string): Observable<ArticleInfo> {
    return Observable.create(observer => {
      const walker = Walk.walk(folderPath);

      walker.on('file', (root, stats, next) => {
        if (/\.md$/.test(stats.name)) {
          const info = new ArticleInfo(
            root,
            path.join(root, stats.name),
            stats
          );

          this.zone.run(() => observer.next(info));
        }
        next();
      });

      walker.on('errors', (root, stats, next) => {
        observer.error(stats);
        next();
      });

      walker.on('end', () => {
        observer.complete();
      });
    });
  }
}
