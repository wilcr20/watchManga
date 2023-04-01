import { Component, OnInit } from '@angular/core';
import { InAppBrowserOptions, InAppBrowser } from '@awesome-cordova-plugins/in-app-browser/ngx';
import { ModalController, NavParams } from '@ionic/angular';
import { Favorite } from 'src/app/interfaces/favorite.interface';

@Component({
  selector: 'app-manga-info',
  templateUrl: './manga-info.page.html',
  styleUrls: ['./manga-info.page.scss'],
})

export class MangaInfoPage implements OnInit {
  data: any;
  isFavorite = false;
  isLoading = false;
  isReadingChapter = true;
  currentFavorite: any;
  currentPercentage: string = "";
  imageUrl: string = "";

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
    this.currentFavorite = null;
    this.imageUrl = "";
    this.isLoading = true;
    this.isFavorite = false;
    this.data = this.navParams.data;
    this.verifyFavoriteManga();
    this.imageUrl = this.getMangaImgUrl();
    this.isLoading = false;
  }

  verifyFavoriteManga() {
    let navData: any = this.navParams.data;
    let favoriteList = localStorage.getItem("favorites");
    if (favoriteList) {
      let list = JSON.parse(favoriteList);
      list.forEach((el: any) => {
        if (el.url == navData.url || navData.url.includes(el.url.split("/manga/")[1])) {
          this.isFavorite = true;
          this.currentFavorite = el;
          this.currentPercentage = this.getPercentage();
        }
      });
    }
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  getMangaImgUrl() {
    if (this.data.data.website == "leercapitulo") {
      return "https://www.leercapitulo.com" + this.data.data.imageUrl;
    }
    return this.data.data.imageUrl;
  }

  addToFavorite() {
    this.isLoading = true;
    let navData: any = this.navParams.data;
    let favoriteList: any = localStorage.getItem("favorites");
    if (favoriteList) {
      let list = JSON.parse(favoriteList);
      let isMangaFavorite = list.filter((l: { url: any; }) => l.url == navData.url);
      if (isMangaFavorite.length == 0) {
        let favorite: Favorite = {
          url: navData.url,
          title: this.data.data.title,
          imgUrl: this.data.data.imageUrl,
          readList: [],
          tab: "ALL",
          website: this.data.data.website
        }
        list.push(favorite);
        this.currentFavorite = favorite;
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

  readChapter(url: string, website: string) {
    if (this.isReadingChapter) {
      let chapterUrl = "";
      let codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe");setInterval(() => {for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })();document.addEventListener("click", handler, true); function handler(e) { e.stopPropagation(); e.preventDefault(); }'
      if (website != "leercapitulo") {
        chapterUrl = url;
      } else {
        chapterUrl = "https://www.leercapitulo.com" + url;
      }

      if (website == "lectortmo") {
        codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe");setInterval(() => {for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })();document.addEventListener("click", handler, true); function handler(e) { console.log(e) }'
      }

      let target = "_blank";
      let browser = this.theInAppBrowser.create(chapterUrl, target, this.options);


      browser.on("loadstart").subscribe(() => {
        browser.executeScript({
          code: codeToExec
        });
      });


      browser.on('loadstop').subscribe(() => {
        browser.executeScript({
          code: codeToExec
        });
      });
    }
    this.isReadingChapter = true;
    setInterval

  }

  seeChapter(chaptNumber: number) {
    this.isLoading = true;
    this.isReadingChapter = false;
    if (this.currentFavorite) {
      let chapterRead = this.currentFavorite.readList.filter((l: { chapter: number; }) => l.chapter == chaptNumber);
      if (chapterRead.length == 0) {
        this.currentFavorite.readList.push({ chapter: chaptNumber });
      } else {
        this.currentFavorite.readList = this.currentFavorite.readList.filter((l: { chapter: number; }) => l.chapter != chaptNumber);
      }
      let favoriteList: any = localStorage.getItem("favorites");
      if (favoriteList) {
        let list = JSON.parse(favoriteList);
        list = list.filter((l: { url: any; }) => l.url != this.currentFavorite.url);
        list.push(this.currentFavorite);
        localStorage.setItem("favorites", JSON.stringify(list));
      }
    }
    this.currentPercentage = this.getPercentage();
    this.isLoading = false;
  }

  isChapterRead(chaptNumber: number) {
    if (this.currentFavorite) {
      if (this.currentFavorite.readList.length == 0) {
        return false;
      }
      let isRead = false;
      this.currentFavorite.readList.forEach((element: any) => {
        if (element.chapter == chaptNumber) {
          isRead = true;
        }
      });
      return isRead;
    }
    return false;
  }

  getPercentage() {
    if (this.currentFavorite) {
      if (this.currentFavorite.readList.length == 0) {
        return "0%";
      }
      let percentage = (this.currentFavorite.readList.length * 100) / this.data.data.chapterList.length;
      if (percentage > 100) {
        this.isLoading = true;
        let temporalChapters = this.currentFavorite.readList;
        this.currentFavorite.readList = temporalChapters.splice(0, this.data.data.chapterList.length);
        this.currentFavorite.readList = this.currentFavorite.readList.filter((l: { chapter: number; }) => l.chapter <= this.data.data.chapterList.length);
        let favoriteList: any = localStorage.getItem("favorites");
        if (favoriteList) {
          let list = JSON.parse(favoriteList);
          list = list.filter((l: { url: any; }) => l.url != this.currentFavorite.url);
          list.push(this.currentFavorite);
          localStorage.setItem("favorites", JSON.stringify(list));
        }
        this.isLoading = false;
        percentage = (this.currentFavorite.readList.length * 100) / this.data.data.chapterList.length;
      }

      return percentage.toFixed(2).replace(".00", "") + "%";

    }
    return "0%";
  }

  getWebsiteName(websiteurl: string) {
    switch (websiteurl) {
      case "leercapitulo":
        return "LeerCapitulo"
        break;
      case "tumanhwas":
        return "TuManhwas";
        break;
      case "tmomanga":
        return "TmoManga";
        break;
      case "lectortmo":
        return "LectorTmo";
        break;
      default:
        return null;
        break;
    }
  }
}
