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
  tabText: string = "ALL";

  ionViewWillEnter() {
    this.getFavoriteList(true)
  }

  getFavoriteList(isFilterForAll: boolean) {
    let favoriteListTemp = localStorage.getItem("favorites");
    if (favoriteListTemp) {
      this.favoriteList = JSON.parse(favoriteListTemp).reverse();
      this.temp_favoriteList = JSON.parse(favoriteListTemp).reverse();
      if (isFilterForAll) {
        this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "ALL");
        this.tabText = "ALL";
      }
      // localStorage.setItem("favorites", JSON.stringify(this.favoriteList.reverse()))
    }
  }

  getImageUrl(url: string) {
    return "https://www.leercapitulo.com" + url;
  }


  getMangaInfo(mangaUrl: string) {
    if (this.isSetNewTabSelected) {
      this.isLoading = true;
      this.mangaService.getMangaInfo({ mangaUrl: mangaUrl }).subscribe((data: any) => {
        this.isLoading = false;
        this.openModal(data, mangaUrl);
      }, (err) => {
        this.isLoading = false;
        console.log(err);
        alert(JSON.stringify(err))
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
      // this.getFavoriteList(false);
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

  }

  setMangaFinished(url: string, tab: string) {
    this.isSetNewTabSelected = false;
    if (tab == "FINISHED") {
      return;
    }
    this.temp_favoriteList.filter((fav: { url: string; }) => fav.url == url)[0].tab = "FINISHED";
    localStorage.setItem("favorites", JSON.stringify(this.temp_favoriteList));
  }

  setMangaPaused(url: string, tab: string) {
    this.isSetNewTabSelected = false;
    if (tab == "PAUSED") {
      return;
    }
    this.temp_favoriteList.filter((fav: { url: string; }) => fav.url == url)[0].tab = "PAUSED";
    localStorage.setItem("favorites", JSON.stringify(this.temp_favoriteList));
  }

  setMangaForMe(url: string, tab: string) {
    this.isSetNewTabSelected = false;
    if (tab == "JUST_FOR_ME") {
      return;
    }
    this.temp_favoriteList.filter((fav: { url: string; }) => fav.url == url)[0].tab = "JUST_FOR_ME";
    localStorage.setItem("favorites", JSON.stringify(this.temp_favoriteList));
  }



  selectAll() {
    this.tabText = "TODOS";
    this.getFavoriteList(true);
    this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "ALL");
  }

  selectMangaFinished() {
    this.tabText = "FINALIZADOS"
    this.getFavoriteList(false);
    this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "FINISHED");
  }

  selectMangaPause() {
    this.tabText = "PAUSADOS";
    this.getFavoriteList(false);
    this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "PAUSED");
  }

  selectMangaJustForMe() {
    this.tabText = "SOLO PARA MÍ";
    this.getFavoriteList(false);
    this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "JUST_FOR_ME");
  }

}
