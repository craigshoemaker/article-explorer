import 'jasmine';

import { ArticleReader } from './articleReader';
import * as path from 'path';

describe('ArticleReader', () => {

    describe('list', () => {
        it('should list Markdown files from file system', done => {
            const folderPath = path.resolve(__dirname, '../../../../spec/data');
            ArticleReader.list(folderPath).subscribe({
                next: file => {
                    expect(file).toBeDefined();
                    expect(/article|article2/.test(file.stats.name)).toEqual(true);
                    expect(/\.md/.test(file.stats.name)).toEqual(true);
                },
                error: err => console.log(err),
                complete: () => done()
            });
        });

        it('should return full file paths', done => {
            const folderPath = path.resolve(__dirname, '../../../../spec/data');
            ArticleReader.list(folderPath).subscribe({
                next: file => {
                    expect(file.path).toBeDefined();
                    expect(file.path.length).toBeGreaterThan(5);
                },
                error: err => console.log(err),
                complete: () => done()
            });
        });
    });
});
