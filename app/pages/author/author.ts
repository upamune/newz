import {Page} from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/author/author.html',
})
export class Author {
    constructor() {}
    
    private openURL(url: string) {
        window.open(url, '_blank', 'location=yes');
    }
}
