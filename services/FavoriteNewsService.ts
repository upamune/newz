import { Http } from 'angular2/http';
import 'rxjs/add/operator/map';
import {Injectable} from "angular2/core";
import {Storage, LocalStorage} from 'ionic-angular';
import {Observable} from 'rxjs'

@Injectable()
export class FavoriteNewsService {
    
    private storage: Storage;
    private key: string;

    constructor(private http: Http) {
        this.storage = new Storage(LocalStorage);
        this.key = "newz-favorite-news-items-key";
    }
    
    private stringToNumArray(str: string): Array<number> {
        if (str === null) return [];
        return str.split(',').map((id: string) => parseInt(id, 10));
    }

    fetchItem(itemId: number) {
        const url = `https://hacker-news.firebaseio.com/v0/item/${itemId}.json`;
        return this.http.get(url).map(res => res.json());
    }

    fetchItemIds() : Observable {
        return Observable.fromPromise(this.storage.get(this.key)).map(res => this.stringToNumArray(res));
    }

    add(itemId: number):void {
        this.fetchItemIds().subscribe((ids) => {
                // 重複登録させない
                if (ids.indexOf(itemId) != -1) return;
                ids.push(itemId);
                this.save(ids);
            }
        );
    }

    remove(itemId: number) : void {
        this.fetchItemIds().subscribe((ids) => {
                ids.some((id, i) => {
                    if (itemId === id) ids.splice(i,1);
                });
                this.save(ids);
            }
        );
    }
    
    get(): Observable {
        return this.fetchItemIds();
    }
    
    save(itemIds: Array<number>): void {
        this.storage.set(this.key, itemIds);
    }
    
    reset(): void {
        this.storage.remove(this.key);
    }
    
}
