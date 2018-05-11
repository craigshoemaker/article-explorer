import 'jasmine';

import { ContentParser } from './contentParser';

const input = `---
title: title 
description: description
author: github
manager: manager
ms.service: service
ms.date: 01/01/2018
ms.author: alias
ms.custom: type
---

# This is the article title
This is the article body paragraph one.

This is the article body paragraph two.

This is the article body paragraph three.
`;

describe('ContentReader', () => {

    describe('getTitle', () => {
        it('should return the article title', () => {
            const reader = new ContentParser();
            const title = reader.getTitle(input);
            expect(title).toEqual('This is the article title');
        });
    });

    describe('getTitle', () => {
        it('should return the article excerpt', () => {
            const regex = /This is the article body paragraph one\.\n\nThis is the article body paragraph two\.\n\nThis is the article body paragraph three\./;
            const reader = new ContentParser();
            const excerpt = reader.getExcerpt(input);
            expect(regex.test(excerpt)).toEqual(true);
        });
    });

    describe('parse', () => {
        it('should return a hydrated ContentModel', () => {
            const regex = /This is the article body paragraph one\.\n\nThis is the article body paragraph two\.\n\nThis is the article body paragraph three\./;
            const reader = new ContentParser();
            const content = reader.parse(input);
            expect(content.title).toEqual('This is the article title');
            expect(regex.test(content.excerpt)).toEqual(true);
        });
    });
});
