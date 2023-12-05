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
    this.data = JSON.parse(localStorage.getItem("mangaInfo") as string).info;
    // this.data = this.navParams.data;
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
      this.setMissingImageForFavorite();
    }
  }

  setMissingImageForFavorite() {
    if (!this.currentFavorite) {
      return;
    }
    if (!this.currentFavorite.imgUrl || this.currentFavorite.imgUrl == "") {
      if (this.data.imageUrl) {
        this.currentFavorite.imgUrl = this.data.imageUrl;
        let favoriteList: any = localStorage.getItem("favorites");
        if (favoriteList) {
          let list = JSON.parse(favoriteList);
          list = list.filter((l: { url: any; }) => l.url != this.currentFavorite.url);
          list.push(this.currentFavorite);
          localStorage.setItem("favorites", JSON.stringify(list));
        }
      }
    }
  }

  async closeModal() {
    const onClosedData: string = "Wrapped Up!";
    await this.modalController.dismiss(onClosedData);
  }

  getMangaImgUrl() {
    if (!this.data.imageUrl && this.currentFavorite) {
      if (this.currentFavorite.imgUrl != undefined || this.currentFavorite.imgUrl != "") {
        return this.currentFavorite.imgUrl;
      }
    }
    return this.data.imageUrl;
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
          title: this.data.title,
          imgUrl: this.data.imageUrl || "",
          readList: [],
          tab: "ALL",
          website: this.data.website,
          lastReadDate: undefined as any
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
    let target = "_blank";
    let codeToExec = '';
    if (this.isReadingChapter) {

      if (website == "manwhaLatino") {
        codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe");setInterval(() => { document.getElementById("miPopup").style.visibility = "hidden";document.getElementById("adult_modal").style.visibility = "hidden"; document.getElementsByClassName("modal-backdrop")[0].style.visibility = "hidden"; for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none";}; }, 20); return f; })();document.addEventListener("click", handler, true); function handler(e) { e.stopPropagation(); e.preventDefault(); }'
        // window.open(url, target);
      } else {
        codeToExec = 'var func = (function f() { var iframes = document.getElementsByTagName("iframe");setInterval(() => {for (let index = 0; index < iframes.length; index++) { iframes[index].style.display = "none" }; }, 20); return f; })();document.addEventListener("click", handler, true); function handler(e) { e.stopPropagation(); e.preventDefault(); }'
      }

      let browser = this.theInAppBrowser.create(url, target, this.options);
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

  }

  seeChapter(chaptNumber: number) {
    this.isLoading = true;
    this.isReadingChapter = false;
    if (this.currentFavorite) {
      let chapterRead = this.currentFavorite.readList.filter((l: { chapter: number; }) => l.chapter == chaptNumber);
      if (chapterRead.length == 0) {
        // Add chapter read
        this.currentFavorite.readList.push({ chapter: chaptNumber });
        const now = new Date();
        this.currentFavorite.lastReadDate = now.toLocaleString('en-GB');
      } else {
        // Remove chapter read
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
      let percentage = (this.currentFavorite.readList.length * 100) / this.data.chapterList.length;
      if (percentage > 100) {
        this.isLoading = true;
        let temporalChapters = this.currentFavorite.readList;
        this.currentFavorite.readList = temporalChapters.splice(0, this.data.chapterList.length);
        this.currentFavorite.readList = this.currentFavorite.readList.filter((l: { chapter: number; }) => l.chapter <= this.data.chapterList.length);
        let favoriteList: any = localStorage.getItem("favorites");
        if (favoriteList) {
          let list = JSON.parse(favoriteList);
          list = list.filter((l: { url: any; }) => l.url != this.currentFavorite.url);
          list.push(this.currentFavorite);
          localStorage.setItem("favorites", JSON.stringify(list));
        }
        this.isLoading = false;
        percentage = (this.currentFavorite.readList.length * 100) / this.data.chapterList.length;
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
      case "manwhaLatino":
        return "ManwhaLatino";
        break;
      default:
        return null;
        break;
    }
  }
}
