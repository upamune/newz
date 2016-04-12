import {Page} from 'ionic-angular';
import {NewNewsService} from '../../../services/NewNewsService'
import {NewsItem} from '../../../models/NewsItem'

@Page({
    templateUrl: 'build/pages/new/new.html',
})
export class New {
    private itemIds: Array<number>;
    private items : Array<NewsItem>;
    constructor(private newsService: NewNewsService) {
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
}
