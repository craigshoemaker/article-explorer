// import 'jasmine';

// import { ArticleReader } from './articleReader';
// import * as path from 'path';

// describe('ArticleReader', () => {

//     describe('read', () => {

//         it('should return an ArticleReader instance', done => {
//             const filePath = path.resolve(__dirname, '../../../../spec/data/article.md');
//             ArticleReader.read(filePath).then(article => {
//                 expect(article).not.toBeNull();
//                 done();
//             });
//         });

//         it('should include filePath', done => {
//             const filePath = path.resolve(__dirname, '../../../../spec/data/article.md');
//             ArticleReader.read(filePath).then(article => {
//                 expect(article.filePath).toEqual(filePath);
//                 done();
//             });
//         });

//         it('should create a metadata instance', done => {
//             const filePath = path.resolve(__dirname, '../../../../spec/data/article.md');
//             ArticleReader.read(filePath).then(article => {
//                 expect(article.metadata).not.toBeNull();
//                 done();
//             });
//         });

//         it('should return metadata values', done => {
//             const filePath = path.resolve(__dirname, '../../../../spec/data/article.md');
//             ArticleReader.read(filePath).then(article => {
//                 expect(article.metadata.title).toEqual('Create a VM and storage account for a scalable application in Azure | Microsoft Docs');
//                 done();
//             });
//         });

//         it('should create a content instance', done => {
//             const filePath = path.resolve(__dirname, '../../../../spec/data/article.md');
//             ArticleReader.read(filePath).then(article => {
//                 expect(article.content).not.toBeNull();
//                 done();
//             });
//         });

//         it('should create a content instance', done => {
//             const filePath = path.resolve(__dirname, '../../../../spec/data/article.md');
//             ArticleReader.read(filePath).then(article => {
//                 expect(article.content.title).toEqual('Create a virtual machine and storage account for a scalable application');
//                 done();
//             });
//         });

//         it('should return correct value for hasContent', done => {
//             const filePath = path.resolve(__dirname, '../../../../spec/data/article.md');
//             ArticleReader.read(filePath).then(article => {
//                 expect(article.hasContent()).toEqual(true);
//                 done();
//             });
//         });

//         it('should read content if provided name matches', done => {
//             const filePath = path.resolve(__dirname, '../../../../spec/data/article.md');
//             ArticleReader.read(filePath, { name: 'roygara' }).then(article => {
//                 expect(article.hasContent()).toEqual(true);
//                 done();
//             });
//         });

//         it('should not read content if provided name does not match', done => {
//             const filePath = path.resolve(__dirname, '../../../../spec/data/article.md');
//             ArticleReader.read(filePath, { name: 'craigshoemaker' }).then(article => {
//                 expect(article.hasContent()).toEqual(false);
//                 done();
//             });
//         });
//     });

//     describe('list', () => {
//         it('should list Markdown files from file system', done => {
//             const folderPath = path.resolve(__dirname, '../../../../spec/data');
//             ArticleReader.list(folderPath).subscribe({
//                 next: file => {
//                     expect(file).toBeDefined();
//                     expect(/article|article2/.test(file.stats.name)).toEqual(true);
//                     expect(/\.md/.test(file.stats.name)).toEqual(true);
//                 },
//                 error: err => console.log(err),
//                 complete: () => done()
//             });
//         });

//         it('should return full file paths', done => {
//             const folderPath = path.resolve(__dirname, '../../../../spec/data');
//             ArticleReader.list(folderPath).subscribe({
//                 next: file => {
//                     expect(file.path).toBeDefined();
//                     expect(file.path.length).toBeGreaterThan(5);
//                 },
//                 error: err => console.log(err),
//                 complete: () => done()
//             });
//         });
//     });
// });
