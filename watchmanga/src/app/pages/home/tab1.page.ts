import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { HomeManga } from 'src/app/interfaces/homeManga.interface';
import { MangaInfoPage } from 'src/app/pages/manga-info/manga-info.page';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  mangaList: Array<HomeManga> = [];
  isLoading = false;
  isLoadingHomeRequest = false;
  isLoadingMangaInfoRequest = false;
  constructor(
    private mangaService: MangaService,
    public modalController: ModalController
  ) {
    let websites = [ 
      {name: "LeerCapitulo", url:"https://www.leercapitulo.com/", imgUrl: "https://www.leercapitulo.com/assets/6614b1b9/images/logo.png"},
      {name: "TuManhwas", url:"https://tumanhwas.com/", imgUrl: "https://tumanhwas.com/logo3.png"},
      {name: "TmoManga", url:"https://tmomanga.com/", imgUrl: "https://tmomanga.com/img/logo.png"},
    ]
    localStorage.setItem("mangasUrls",JSON.stringify(websites));
    localStorage.removeItem("website");
    localStorage.setItem("websiteSelected", JSON.stringify(websites[0]))
    this.getMangaHome()
  }

  getMangaHome() {
    this.isLoading = true;
    this.isLoadingHomeRequest = true;
    this.mangaService.getHomeManga()?.subscribe((data: any) => {
      this.isLoading = false;
      this.isLoadingHomeRequest = false;
      this.mangaList = data.data;
    }, (err) => {
      this.isLoading = false;
      this.isLoadingHomeRequest = false;
      console.log(err);
    })
  }

  getImageUrl(url: string) {
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    if(website.name == "LeerCapitulo"){
      return "https://www.leercapitulo.com" + url;
    }
    return url;
  }

  getMangaInfo(mangaUrl: string) {
    this.isLoading = true;
    this.isLoadingMangaInfoRequest = true;
    this.mangaService.getMangaInfo({ mangaUrl: mangaUrl })?.subscribe((data: any) => {
      this.isLoading = false;
      this.isLoadingMangaInfoRequest = false;
      this.openModal(data, mangaUrl);
    }, (err) => {
      this.isLoading = false;
      this.isLoadingMangaInfoRequest = false;
      console.log(err);
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
    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned !== null) {
        // this.dataReturned = dataReturned.data;
        //alert('Modal Sent Data :'+ dataReturned);
      }
    });
    return await modal.present();
  }

}
