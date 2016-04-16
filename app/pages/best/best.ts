import {Page} from 'ionic-angular';
import {FavoriteNewsService} from '../../../services/FavoriteNewsService'
import {NewsService} from '../../../services/NewsService'
import {NewsItem} from '../../../models/NewsItem'

@Page({
    templateUrl: 'build/pages/best/best.html',
})
export class Best {
    private itemIds: Array<number>;
    private items : Array<NewsItem>;
    constructor(private newsService: NewsService,private favoriteService: FavoriteNewsService) {
        this.items = [];
        
        this.newsService.fetchItemIds().subscribe(
            data => {
                this.itemIds = data;
                this.itemIds = this.itemIds.slice(0, 30);
                this.itemIds.map(itemId => {
                    this.newsService.fetchItem(itemId).subscribe(
                        data => {
                            this.items.push(new NewsItem(data));
                        }
                    );
                });
            });
    }

    private clickItem(item: NewsItem) {
        this.addFavorite(item);
    }

    private addFavorite(item: NewsItem) {
        this.favoriteService.add(item.getId());
        this.favoriteService.save();
    }
}

