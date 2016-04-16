import 'es6-shim';
import {App, Platform} from 'ionic-angular';
import {StatusBar} from 'ionic-native';
import {TabsPage} from './pages/tabs/tabs';
import {NewsService} from '../services/NewsService';
import {NewNewsService} from '../services/NewNewsService';
import {FavoriteNewsService} from '../services/FavoriteNewsService';

@App({
  template: '<ion-nav [root]="rootPage"></ion-nav>',
  config: {},
  providers: [NewsService, NewNewsService, FavoriteNewsService]
})
export class MyApp {
  rootPage: any = TabsPage;

  constructor(platform: Platform) {
    platform.ready().then(() => {
      StatusBar.styleDefault();
    });
  }
}
