import {Page} from 'ionic-angular';
import {InAppBrowser} from 'ionic-native';
import {NewNewsService} from '../../../services/NewNewsService'
import {FavoriteNewsService} from '../../../services/FavoriteNewsService'
import {NewsItem} from '../../../models/NewsItem'

@Page({
    templateUrl: 'build/pages/new/new.html',
})
export class New {
    private itemIds: Array<number>;
    private items : Array<NewsItem>;
    constructor(private newsService: NewNewsService, private favoriteService: FavoriteNewsService) {
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
        let ref = InAppBrowser.open(item.getUrl(), '_blank', 'location=no');
    }

    private addFavorite(item: NewsItem) {
        this.favoriteService.add(item.getId());
    }
}
