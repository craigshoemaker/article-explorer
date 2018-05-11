import 'jasmine';

import { ArticlesReader } from './articlesReader';
import * as path from 'path';

describe('ArticlesReader', () => {

    describe('read', () => {
        it('should read Markdown files from file system', done => {
            const reader = new ArticlesReader();
            const folderPath = path.resolve(__dirname, '../../../../spec/data');
            reader.read(folderPath).subscribe({
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
            const reader = new ArticlesReader();
            const folderPath = path.resolve(__dirname, '../../../../spec/data');
            reader.read(folderPath).subscribe({
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
