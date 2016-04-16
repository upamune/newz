export class NewsItem {
    private id: number;
    private deleted: boolean;
    private type: string;
    private by: string;
    private time: string;
    private text: string;
    private dead: boolean;
    private parent: number;
    private kids: Array<number>;
    private url: string;
    private score: number;
    private title: string;
    private parts: Array<number>;
    private descendants: number;
    private domain: string;
    
    constructor(data: any) {
        this.id = data.id;
        this.title = data.title;
        this.kids = data.hasOwnProperty('kids') ? data.kids : [];
        this.score =  data.hasOwnProperty('score') ? data.score : 0;
        this.url =  data.hasOwnProperty('url') ? data.url : "";
        this.domain = this.extractDomainFromUrl(this.url);
    }
    
    public getId(): number {
        return this.id;
    }
    
    public getUrl(): string {
        return this.url;
    }
    
    private extractDomainFromUrl(url: string): string {
        let domain;
        if (url.indexOf("://") > -1) {
            domain = url.split('/')[2];
        }
        else {
            domain = url.split('/')[0];
        }

        domain = domain.split(':')[0];

        return domain;
    }
}