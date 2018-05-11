export class ContentModel {
    title: string;
    excerpt: string;
}

export class ContentParser {

    getTitle(input: string): string {
        let title = '';
        const matches = /#\s(.*)/.exec(input);

        if(matches && matches.length > 1) {
            title = matches[1].trim().replace('#', '');
        }

        return title;
    }

    getExcerpt(input:string): string {
        const startIndex = input.indexOf(this.getTitle(input))
        return input.substr(startIndex, input.length - 1);
    }

    parse(input: string): ContentModel {
        const value = new ContentModel();

        value.title = this.getTitle(input);
        value.excerpt = this.getExcerpt(input);

        return value;
    }

}