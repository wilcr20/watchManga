import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { MangaService } from 'src/app/services/manga.service';
import { MangaInfoPage } from '../manga-info/manga-info.page';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.page.html',
  styleUrls: ['./favorites.page.scss'],
})
export class FavoritesPage {

  constructor(
    private mangaService: MangaService,
    public modalController: ModalController
  ) { }

  isLoading = false;
  isSetNewTabSelected = true;
  favoriteList: any = [];
  temp_favoriteList: any = [];
  tabText: string = "TODOS";

  ionViewWillEnter() {
    this.getFavoriteList(true);
    this.tabText = "TODOS";
  }

  getFavoriteList(isFilterForAll: boolean) {
    let favoriteListTemp = localStorage.getItem("favorites");
    if (favoriteListTemp) {
      this.favoriteList = JSON.parse(favoriteListTemp).reverse();
      this.temp_favoriteList = JSON.parse(favoriteListTemp);
      if (isFilterForAll) {
        this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "ALL");
        // this.tabText = "ALL";
      }
    }
  }

  getImageUrl(url: string) {
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    if(website.name == "LeerCapitulo"){
      return "https://www.leercapitulo.com" + url;
    }
    return url;
  }


  getMangaInfo(mangaUrl: string) {
    if (this.isSetNewTabSelected) {
      this.isLoading = true;
      this.mangaService.getMangaInfo({ mangaUrl: mangaUrl })?.subscribe((data: any) => {
        this.isLoading = false;
        this.openModal(data, mangaUrl);
      }, (err) => {
        this.isLoading = false;
        console.log(err);
      })
    }
    this.isSetNewTabSelected = true;
  }

  async openModal(mangaInfo: any, mangaUrl: string) {
    const modal = await this.modalController.create({
      component: MangaInfoPage,
      componentProps: {
        data: mangaInfo,
        url: mangaUrl
      }
    });
    modal.onDidDismiss().then(() => {
      this.getFavoriteList(true);
      this.updateFavoriteList();
    });
    return await modal.present();
  }



  setMangaForAll(url: string, tab: string) {
    this.isSetNewTabSelected = false;
    if (tab == "ALL") {
      return;
    }
    this.temp_favoriteList.filter((fav: { url: string; }) => fav.url == url)[0].tab = "ALL";
    localStorage.setItem("favorites", JSON.stringify(this.temp_favoriteList));
    this.updateFavoriteList();
  }

  setMangaFinished(url: string, tab: string) {
    this.isSetNewTabSelected = false;
    if (tab == "FINISHED") {
      return;
    }
    this.temp_favoriteList.filter((fav: { url: string; }) => fav.url == url)[0].tab = "FINISHED";
    localStorage.setItem("favorites", JSON.stringify(this.temp_favoriteList));
    this.updateFavoriteList();
  }

  setMangaPaused(url: string, tab: string) {
    this.isSetNewTabSelected = false;
    if (tab == "PAUSED") {
      return;
    }
    this.temp_favoriteList.filter((fav: { url: string; }) => fav.url == url)[0].tab = "PAUSED";
    localStorage.setItem("favorites", JSON.stringify(this.temp_favoriteList));
    this.updateFavoriteList();
  }

  setMangaForMe(url: string, tab: string) {
    this.isSetNewTabSelected = false;
    if (tab == "JUST_FOR_ME") {
      return;
    }
    this.temp_favoriteList.filter((fav: { url: string; }) => fav.url == url)[0].tab = "JUST_FOR_ME";
    localStorage.setItem("favorites", JSON.stringify(this.temp_favoriteList));
    this.updateFavoriteList();
  }



  selectAll() {
    this.tabText = "TODOS";
    this.getFavoriteList(false);
    this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "ALL");
  }

  selectMangaFinished() {
    this.tabText = "LOS MEJORES"
    this.getFavoriteList(false);
    this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "FINISHED");
  }

  selectMangaPaused() {
    this.tabText = "LEER LUEGO";
    this.getFavoriteList(false);
    this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "PAUSED");
  }

  selectMangaJustForMe() {
    this.tabText = "SOLO PARA MÍ";
    this.getFavoriteList(false);
    this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "JUST_FOR_ME");
  }

  updateFavoriteList() {
    if (this.tabText == "TODOS") {
      this.selectAll();
    } else if (this.tabText == "LOS MEJORES") {
      this.selectMangaFinished();
    } else if (this.tabText == "LEER LUEGO") {
      this.selectMangaPaused();
    } else if (this.tabText == "SOLO PARA MÍ") {
      this.selectMangaJustForMe();
    }
  }

}
