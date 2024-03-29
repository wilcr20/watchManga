import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HomeManga } from 'src/app/interfaces/homeManga.interface';
import { MangaInfoPage } from 'src/app/pages/manga-info/manga-info.page';
import { MangaService } from 'src/app/services/manga.service';
import websites from '../../data/websites.json';


@Component({
  selector: 'app-tab1',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage {
  mangaList: Array<HomeManga> = [];
  isLoading = false;
  isLoadingHomeRequest = false;
  isLoadingMangaInfoRequest = false;
  websites: any;
  constructor(
    public mangaService: MangaService,
    public modalController: ModalController,
    private alertController: AlertController,
  ) {
    this.websites = websites.data;
    if (!this.mangaService.getMangaWebSiteSelected()) {
      localStorage.setItem("websiteSelected", JSON.stringify(this.websites[0]));
    }
  }

  ionViewWillEnter() {
    this.websites = websites.data;
    localStorage.setItem("mangasUrls", JSON.stringify(this.websites));
    this.getMangaHome();
  }

  getMangaHome() {
    this.isLoading = true;
    this.mangaList = [];
    this.isLoadingHomeRequest = true;
    this.mangaService.getHomeManga()?.subscribe((data: any) => {
      if (data?.statusCode == 403) {
        this.isLoading = false;
        this.isLoadingHomeRequest = false;
        this.mangaList = [];
        return;
      }
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
    localStorage.setItem("mangaInfo", JSON.stringify({ info: mangaInfo }));
    const modal = await this.modalController.create({
      component: MangaInfoPage,
      componentProps: {
        url: mangaUrl
      },
      mode: "ios"
    });
    modal.onDidDismiss().then((dataReturned) => {
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
          label: 'LectorMangaLat',
          type: 'radio',
          value: 'lectormangaLat',
        },
        {
          label: 'ManwhaLatino',
          type: 'radio',
          value: 'manwhaLatino',
        },
        /* {
           label: 'TuManhwas',
           type: 'radio',
           value: 'tumanhwas',
         },
         {
           label: 'TmoManga',
           type: 'radio',
           value: 'tmomanga',
         },
         {
          label: 'LectorTMO',
          type: 'radio',
          value: 'lectortmo',
         },
        */
      ],
    });

    await alert.present();
  }

  updateWebsite(data: string) {
    switch (data) {
      case "leercapitulo":
        if (this.mangaService.getMangaWebSiteSelected().name != "LeerCapitulo") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[0]));
          this.getMangaHome();
        }
        break;
      case "tumanhwas":
        if (this.mangaService.getMangaWebSiteSelected().name != "TuManhwas") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[1]));
          this.getMangaHome();
        }
        break;
      case "tmomanga":
        if (this.mangaService.getMangaWebSiteSelected().name != "TmoManga") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[2]));
          this.getMangaHome();
        }
        break;
      case "lectortmo":
        if (this.mangaService.getMangaWebSiteSelected().name != "LectorTmo") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[3]));
          this.getMangaHome();
        }
        break;
      case "lectormangaLat":
        if (this.mangaService.getMangaWebSiteSelected().name != "LectorMangaLat") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[4]));
          this.getMangaHome();
        }
        break;
      case "manwhaLatino":
        if (this.mangaService.getMangaWebSiteSelected().name != "ManwhaLatino") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[5]));
          this.getMangaHome();
        }
        break;
      default:
        break;
    }
  }
}

