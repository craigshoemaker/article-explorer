import { Metadata } from '../metaData';

export class MetadataReader {

    constructor() {}

    public getValue(input: string, key: string): string {
        key = key.replace('.', '\\.');
        const regex = new RegExp(`${key}\s?:\s?(.*)`);
        const matches = regex.exec(input);
        let value = '';
        if(matches.length > 1) {
            value = matches[1].trim();
        }
        return value;
    }

    parse(input: string): Metadata {
        const metadata = new Metadata();

        metadata.title = this.getValue(input, 'title');
        metadata.description = this.getValue(input, 'description');
        metadata.github = this.getValue(input, 'author');
        metadata.alias = this.getValue(input, 'ms.author');
        metadata.manager = this.getValue(input, 'manager');
        metadata.refreshDate = new Date(this.getValue(input, 'ms.date'));
        metadata.type = this.getValue(input, 'ms.custom');

        return metadata;
    }
    
}