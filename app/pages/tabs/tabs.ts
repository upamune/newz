import {Page} from 'ionic-angular';
import {Home} from '../home/home';
import {New} from '../new/new';
import {Best} from '../best/best';
import {Fav} from '../fav/fav';
import {Setting} from '../setting/setting';

@Page({
  templateUrl: 'build/pages/tabs/tabs.html'
})
export class TabsPage {
  homeRoot: any = Home;
  newRoot: any = New;
  bestRoot: any = Best;
  favRoot: any = Fav;
  settingRoot: any = Setting;
}
