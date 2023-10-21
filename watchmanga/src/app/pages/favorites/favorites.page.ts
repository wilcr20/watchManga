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
    document.getElementById("firstSegmentTab")?.click();
  }



  getFavoriteList(isFilterForAll: boolean) {
    let favoriteListTemp = localStorage.getItem("favorites");
    if (favoriteListTemp) {
      this.favoriteList = JSON.parse(favoriteListTemp).reverse();
      
      // Ignorando otros websites inactivos
      this.favoriteList = this.favoriteList.filter( (fav: { website: string; }) => fav.website == "leercapitulo" );
      this.temp_favoriteList = JSON.parse(favoriteListTemp);

      if (isFilterForAll) {
        this.favoriteList = this.favoriteList.filter((manga: { tab: string; }) => manga.tab == "ALL");
        // this.tabText = "ALL";
      }
    }
  }

  getImageUrl(favorite: any) {
    return favorite.imgUrl;
  }


  getMangaInfo(mangaUrl: string, website: string) {
    if (this.isSetNewTabSelected) {
      this.isLoading = true;
      this.mangaService.getMangaInfo({ mangaUrl: mangaUrl }, website)?.subscribe((data: any) => {
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
    localStorage.setItem("mangaInfo", JSON.stringify({info: mangaInfo }));
    const modal = await this.modalController.create({
      component: MangaInfoPage,
      componentProps: {
        url: mangaUrl
      },
      mode: "ios"
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

  getlastReadDate(lastReadFav: any) {
    const now = new Date();
    let startTimestamp = this.getTimestamp(lastReadFav);
    let stopTimestamp = this.getTimestamp(now.toLocaleString('en-GB'));
    let differenceInSecs = stopTimestamp - startTimestamp;
   
    if (differenceInSecs < 60) {
      return "Leído por última vez hace unos segundos.";
    } else {
      if (differenceInSecs < 3600) {
        let mins = Math.abs(differenceInSecs / 60).toString().split(".")[0];
        if (mins == "1") {
          return "Leído por última vez hace 1 minuto.";
        } else {
          return "Leído por última vez hace " + mins + " minutos.";
        }
      } else {
        if (differenceInSecs < 86400) {
          let hours = Math.abs(differenceInSecs / 3600).toString().split(".")[0];
          if (hours == "1") {
            return "Leído por última vez hace 1 hora.";
          } else {
            return "Leído por última vez hace " + hours + " horas.";
          }
        } else {
          let days = Math.abs(differenceInSecs / 86400).toString().split(".")[0];
          if (days == "1") {
            return "Leído por última vez hace 1 día.";
          } else {
            return "Leído por última vez hace " + days + " días.";
          }
        }
      }
    }
  }

  getTimestamp(time: string) {
    let timeFirst = time.split(', ')[0].split('/');
    let timeY = timeFirst[2];
    let timeM = timeFirst[1];
    let timeD = timeFirst[0];
    let timeSecond = time.split(', ')[1];
    let timestamp =
      new Date(
        Date.parse(
          timeY + '-' + timeM + '-' + timeD + ' ' + timeSecond + '+0000'
        )
      ).getTime() / 1000;
    return timestamp;
  }

}
