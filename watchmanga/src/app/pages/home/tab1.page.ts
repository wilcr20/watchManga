import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeManga } from 'src/app/interfaces/homeManga.interface';
import { MangaInfoPage } from 'src/app/manga-info/manga-info.page';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  mangaList: Array<HomeManga> = [];
  isLoading = false;
  constructor(
    private mangaService: MangaService,
    public modalController: ModalController
  ) {
    this.getMangaHome()
  }

  getMangaHome() {
    this.isLoading = true;
    this.mangaService.getHomeManga().subscribe((data: any) => {
      this.isLoading = false;
      this.mangaList = data.data;
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    })
  }

  getImageUrl(img: string) {
    return "https://www.leercapitulo.com" + img;
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
    console.log(mangaInfo);
    const modal = await this.modalController.create({
      
      component: MangaInfoPage,
      componentProps: {
        data: mangaInfo,
        url: mangaUrl
      }
    });
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        // this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });

    return await modal.present();
  }

}
