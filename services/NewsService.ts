import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';
import {Injectable} from "angular2/core";

@Injectable()
export class NewsService {

    constructor(private http: Http) {}
    
    fetchItem(itemId: number) {
        const url = `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`
        return this.http.get(url).map(res => res.json());
    }

    fetchItemIds() {
        const url = 'https://hacker-news.firebaseio.com/v0/topstories.json'
        return this.http.get(url).map(res => res.json());
    }
}