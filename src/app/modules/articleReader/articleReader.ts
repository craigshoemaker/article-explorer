import * as Walk from 'walk';
import * as path from 'path';
import * as fs from 'fs';
import * as LineReader  from 'line-by-line';
import { Observable } from 'rxjs'
import { MetadataParser } from '../metadataParser/metadataParser';
import { ContentParser } from '../contentParser/contentParser';
import { Metadata } from '../metaData';
import { ContentModel } from '../contentModel';
import { ArticleInfo } from '../articleInfo';

export class ArticleReader {
    filePath: string;
    metadata: Metadata;
    content: ContentModel;

    hasContent(): boolean {
        return this.content !== null;
    }

    public static read(filePath: string, options?: any) {
        return new Promise<ArticleReader>((resolve, reject) => {

            const reader = new LineReader(filePath, { end: 800 });
            const article = new ArticleReader();
            const data = [];

            article.filePath = filePath;
        
            reader.on('error', err => reject(err));
            reader.on('line', line => data.push(line));
            
            reader.on('end', function () {
                const contents = data.join('\n');

                const metadataParser = new MetadataParser();
                const contentParser = new ContentParser();

                article.metadata = metadataParser.parse(contents);

                if(options) {
                    if(options.name) {
                        if(article.metadata.github === options.name) {
                            article.content = contentParser.parse(contents);
                        } else {
                            article.content = null;
                        }
                    }
                } else {
                    article.content = contentParser.parse(contents);                    
                }

                resolve(article);
            });
        });
    }

    public static list(folderPath: string): Observable<ArticleInfo> {
        return Observable.create(observer => {
            const walker = Walk.walk(folderPath);
    
            walker.on('file', (root, stats, next) => {
                if (/\.md/.test(stats.name)) {
                    const info = new ArticleInfo(root, path.join(root, stats.name), stats);
                    observer.next(info);
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
