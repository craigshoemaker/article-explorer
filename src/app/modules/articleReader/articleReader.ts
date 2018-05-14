import * as Walk from 'walk';
import * as path from 'path';
import * as fs from 'fs';
import * as LineReader  from 'line-by-line';
import { Observable } from 'rxjs'
import { MetadataParser } from '../metadataParser/metadataParser';
import { ContentParser } from '../contentParser/contentParser';
import { Metadata } from '../metaData';
import { ContentModel } from '../contentModel';

export class ArticleReader {
    metadata: Metadata;
    content: ContentModel;

    public static read(filePath: string) {
        return new Promise<ArticleReader>((resolve, reject) => {

            const reader = new LineReader(filePath, { end: 800 });
            const data = [];
            const article = new ArticleReader();
        
            reader.on('error', err => reject(err));
            
            reader.on('line', line => data.push(line));
            
            reader.on('end', function () {
                const contents = data.join('\n');

                const metadataParser = new MetadataParser();
                const contentParser = new ContentParser();

                article.metadata = metadataParser.parse(contents);
                article.content = contentParser.parse(contents);

                resolve(article);
            });
        });
    }

    public static list(folderPath: string): Observable<any> {
        return Observable.create(observer => {
            const walker = Walk.walk(folderPath);
    
            walker.on('file', (root, stats, next) => {
                if (/\.md/.test(stats.name)) {
                    observer.next({
                        root: root,
                        path: path.join(root, stats.name),
                        stats: stats
                    });
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
