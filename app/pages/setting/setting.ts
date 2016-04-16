import {Page} from 'ionic-angular';
import {Author} from '../author/author'
import {FavoriteNewsService} from '../../../services/FavoriteNewsService'


@Page({
    templateUrl: 'build/pages/setting/setting.html',
})
export class Setting {
    private length: number;
    private authorPage: any = Author;
    
    constructor(private newsService: FavoriteNewsService) {
        this.update();
        this.newsService.favChanged.subscribe(() => this.update());
    }
    
    private update() {
        this.newsService.fetchItemIds().subscribe((ids : Array<number>) => this.length = ids ? ids.length : 0);
    }
    
    private clickDelete() : void {
        this.newsService.reset();
    }
}
