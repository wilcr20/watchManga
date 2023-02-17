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
  favoriteList: any = [];
  ionViewWillEnter() {
    this.getFavoriteList()
  }

  getFavoriteList() {
    let favoriteList = localStorage.getItem("favorites");
    if (favoriteList) {
      this.favoriteList = JSON.parse(favoriteList);
    }
  }

  getImageUrl(url:string){
    return "https://www.leercapitulo.com" + url;
  }


  getMangaInfo(mangaUrl: string) {
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

  async openModal(mangaInfo: any, mangaUrl: string) {
    const modal = await this.modalController.create({
      component: MangaInfoPage,
      componentProps: {
        data: mangaInfo,
        url: mangaUrl
      }
    });
    modal.onDidDismiss().then(() => {
      this.getFavoriteList();
    });
    return await modal.present();
  }

}
