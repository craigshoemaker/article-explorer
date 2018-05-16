import { Injectable, NgZone } from '@angular/core';
import * as LineReader from 'line-by-line';
import * as path from 'path';
import { Observable } from 'rxjs';
import * as Walk from 'walk';
import { ArticleInfo } from '../articleInfo';
import { ContentModel } from '../contentModel';
import { ContentParser } from '../contentParser/contentParser';
import { Metadata } from '../metaData';
import { MetadataParser } from '../metadataParser/metadataParser';

export class Article {
  filePath: string;
  metadata: Metadata;
  content: ContentModel;
}

@Injectable()
export class ArticleReader {
  // filePath: string;
  // metadata: Metadata;
  // content: ContentModel;

  constructor(private zone: NgZone) {}

  // hasContent(): boolean {
  //   return !!this.content; //  !== null;
  // }

  public read(filePath: string, options?: any) {
    return new Promise<Article>((resolve, reject) => {
      const reader = new LineReader(filePath, { end: 800 });
      const article = new Article();
      // const article = this;
      const data = [];

      article.filePath = filePath;

      reader.on('error', err => reject(err));
      reader.on('line', line => data.push(line));

      reader.on('end', () => {
        const contents = data.join('\n');

        const metadataParser = new MetadataParser();
        const contentParser = new ContentParser();

        article.metadata = metadataParser.parse(contents);

        if (options && options.name) {
          if (article.metadata.github === options.name) {
            article.content = contentParser.parse(contents);
          } else {
            article.content = null;
          }
        } else {
          article.content = contentParser.parse(contents);
        }

        this.zone.run(() => {
          resolve(article);
        });
      });
    });
  }

  public list(folderPath: string): Observable<ArticleInfo> {
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

          // observer.next(info);
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
