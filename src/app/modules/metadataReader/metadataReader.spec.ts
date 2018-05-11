import 'jasmine';

import { MetadataReader } from './metadataReader';

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
`;

describe('MetadataReader', () => {

    describe('getValue', () => {

        it('should return value corresponding to given key', () => {
            const reader = new MetadataReader();
            const value = reader.getValue(input, 'title');
            expect(value).toEqual('title');
        });

    });

    describe('parse', () => {

        it('should return an instance of Metadata', () => {
            const reader = new MetadataReader();
            const metadata = reader.parse(input);
            expect(metadata).not.toBeNull();
        });

        it('should return title', () => {
            const reader = new MetadataReader();
            const metadata = reader.parse(input);
            expect(metadata.title).toBeDefined();
            expect(metadata.title).toEqual('title');
        });

        it('should return description', () => {
            const reader = new MetadataReader();
            const metadata = reader.parse(input);
            expect(metadata.description).toBeDefined();
            expect(metadata.description).toEqual('description');
        });

        it('should return author\'s GitHub username', () => {
            const reader = new MetadataReader();
            const metadata = reader.parse(input);
            expect(metadata.github).toBeDefined();
            expect(metadata.github).toEqual('github');
        });

        it('should return author\'s domain alias', () => {
            const reader = new MetadataReader();
            const metadata = reader.parse(input);
            expect(metadata.alias).toBeDefined();
            expect(metadata.alias).toEqual('alias');
        });

        it('should return manager alias', () => {
            const reader = new MetadataReader();
            const metadata = reader.parse(input);
            expect(metadata.manager).toBeDefined();
            expect(metadata.manager).toEqual('manager');
        });

        it('should return refresh date', () => {
            const reader = new MetadataReader();
            const metadata = reader.parse(input);
            expect(metadata.refreshDate).toBeDefined();
            expect(metadata.refreshDate.toDateString()).toEqual(new Date('01/01/2018').toDateString());
        });

        it('should return the document type', () => {
            const reader = new MetadataReader();
            const metadata = reader.parse(input);
            expect(metadata.type).toBeDefined();
            expect(metadata.type).toEqual('type');
        });
    });
});
