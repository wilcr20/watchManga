import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
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
  websites: any[]= [];
  constructor(
    public mangaService: MangaService,
    public modalController: ModalController,
    private alertController: AlertController
  ) {
    this.websites = [
      { name: "LeerCapitulo", url: "https://www.leercapitulo.com/", imgUrl: "https://www.leercapitulo.com/assets/6614b1b9/images/logo.png" },
      { name: "TuManhwas", url: "https://tumanhwas.com/", imgUrl: "https://i.imgur.com/VlLoINI.png" },
      { name: "TmoManga", url: "https://tmomanga.com/", imgUrl: "https://tmomanga.com/img/logo.png" },
    ]
    localStorage.setItem("mangasUrls", JSON.stringify(this.websites));
    // localStorage.removeItem("website");
    // localStorage.setItem("websiteSelected", JSON.stringify(this.websites[0]))
    this.getMangaHome()
  }

  getMangaHome() {
    this.isLoading = true;
    this.mangaList = [];
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

  getImageUrl(manga: any) {
    if (manga.website == "leercapitulo") {
      return "https://www.leercapitulo.com" + manga.imageUrl;
    }
    return manga.imageUrl;
  }

  getMangaInfo(mangaUrl: string, website: string) {
    this.isLoading = true;
    this.isLoadingMangaInfoRequest = true;
    this.mangaService.getMangaInfo({ mangaUrl: mangaUrl }, website)?.subscribe((data: any) => {
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

  async changeWebsiteSelected() {
    const alert = await this.alertController.create({
      header: 'Selecciona un website',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        },
        {
          text: 'OK',
          handler: (data) => {
            this.updateWebsite(data);
          }
        }
      ],
      inputs: [
        {
          label: 'LeerCapitulo',
          type: 'radio',
          value: 'leercapitulo',
        },
        {
          label: 'TuManhwas',
          type: 'radio',
          value: 'tumanhwas',
        },
        {
          label: 'TmoManga',
          type: 'radio',
          value: 'tmomanga',
        },
      ],
    });

    await alert.present();
  }

  updateWebsite(data: string) {
    switch (data) {
      case "leercapitulo":
        if(this.mangaService.getMangaWebSiteSelected().name != "LeerCapitulo"){
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[0]));
          this.getMangaHome();
        }
        break;
      case "tumanhwas":
        if(this.mangaService.getMangaWebSiteSelected().name != "TuManhwas"){
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[1]));
          this.getMangaHome();
        }
        break;
      case "tmomanga":
        if(this.mangaService.getMangaWebSiteSelected().name != "TmoManga"){
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[2]));
          this.getMangaHome();
        }
        break;
      default:
        break;
    }
  }
}

