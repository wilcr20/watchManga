import { Component, OnInit } from '@angular/core';
import { InAppBrowserOptions, InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-manga-info',
  templateUrl: './manga-info.page.html',
  styleUrls: ['./manga-info.page.scss'],
})
export class MangaInfoPage implements OnInit {
  data: any;
  isFavorite = false;
  isLoading = false;
  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'no',
    clearsessioncache: 'no',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only   
  };

  constructor(
    private modalController: ModalController,
    private navParams: NavParams,
    private theInAppBrowser: InAppBrowser
  ) { }

  ngOnInit() {
    this.isFavorite = false;
    this.data = this.navParams.data;
    this.verifyFavoriteManga();
  }

  verifyFavoriteManga() {
    let navData: any = this.navParams.data;
    let favoriteList = localStorage.getItem("favorites");
    if (favoriteList) {
      this.isLoading = true;
      let list = JSON.parse(favoriteList);
      list.forEach((el: any) => {
        if (el.url == navData.url) {
          this.isFavorite = true;
          this.isLoading = false;
          return;
        }
      });
      this.isLoading = false;
    }
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  getMangaImgUrl() {
    return "https://www.leercapitulo.com" + this.data.data.imageUrl;
  }

  addToFavorite() {
    this.isLoading = true;
    let navData: any = this.navParams.data;
    let favoriteList: any = localStorage.getItem("favorites");
    if (favoriteList) {
      let list = JSON.parse(favoriteList);
      let isMangaFavorite = list.filter((l: { url: any; }) => l.url == navData.url);
      if (isMangaFavorite.length == 0) {
        list.push({ url: navData.url, title: this.data.data.title, imgUrl: this.data.data.imageUrl });
        this.isFavorite = true;
        localStorage.setItem("favorites", JSON.stringify(list));
      }
    }
    this.isLoading = false;
  }

  removeToFavorite() {
    this.isLoading = true;
    let navData: any = this.navParams.data;
    let favoriteList: any = localStorage.getItem("favorites");
    if (favoriteList) {
      let list = JSON.parse(favoriteList);
      list = list.filter((l: { url: any; }) => l.url != navData.url);
      this.isFavorite = false;
      localStorage.setItem("favorites", JSON.stringify(list));
    }
    this.isLoading = false;
  }

  readChapter(url: string) {
    let chapterUrl = "https://www.leercapitulo.com" + url;
    let target = "_blank";
    this.theInAppBrowser.create(chapterUrl, target, this.options);
  }
}
