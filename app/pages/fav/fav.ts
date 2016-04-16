import {Page} from 'ionic-angular';
import {FavoriteNewsService} from '../../../services/FavoriteNewsService'
import {NewsItem} from '../../../models/NewsItem'

@Page({
    templateUrl: 'build/pages/fav/fav.html',
})
export class Fav {
    private itemIds: Array<number>;
    private items : Array<NewsItem>;
    
    constructor(private newsService: FavoriteNewsService) {
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

    private update() {
    }
    
    private clickItem(item: NewsItem) {
        this.deleteFavorite(item);
    }
    
    private deleteFavorite(item: NewsItem) {
        this.newsService.remove(item.getId());
        this.newsService.save();
        this.items.some((itm: NewsItem, i: number) => {
            if(item.getId() == itm.getId()) {
                this.items.splice(i,1);
            }
        });
    }

}
