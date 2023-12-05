import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HomeManga } from 'src/app/interfaces/homeManga.interface';
import { MangaInfoPage } from 'src/app/pages/manga-info/manga-info.page';
import { MangaService } from 'src/app/services/manga.service';
import websites from '../../data/websites.json';

@Component({
  selector: 'app-tab2',
  templateUrl: 'trends.page.html',
  styleUrls: ['trends.page.scss']
})
export class TrendsPage {
  isLoading = false;
  isLoadingTrendsRequest = false;
  mangaList: Array<HomeManga> = [];
  websites: any;

  constructor(
    public mangaService: MangaService,
    public modalController: ModalController,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.websites = websites.data;
    localStorage.setItem("mangasUrls", JSON.stringify(this.websites));
    this.getMangaTrends();
  }

  getMangaTrends() {
    this.mangaList = [];
    this.isLoading = true;
    this.isLoadingTrendsRequest = true;
    this.mangaService.getTrendsManga()?.subscribe((data: any) => {
      this.isLoading = false;
      this.isLoadingTrendsRequest = false;
      this.mangaList = data.data;
    }, (err) => {
      this.isLoading = false;
      this.isLoadingTrendsRequest = false;
      console.log(err);
    })
  }

  getImageUrl(manga: any, website: string) {
    return manga.imageUrl;
  }

  getMangaInfo(mangaUrl: string, website: string) {
    this.isLoading = true;
    this.mangaService.getMangaInfo({ mangaUrl: mangaUrl }, website)?.subscribe((data: any) => {
      this.isLoading = false;
      this.openModal(data, mangaUrl);
    }, (err) => {
      this.isLoading = false;
      console.log(err);
      alert(JSON.stringify(err))
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
        }
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
          this.getMangaTrends();
        }
        break;
      case "tumanhwas":
        if (this.mangaService.getMangaWebSiteSelected().name != "TuManhwas") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[1]));
          this.getMangaTrends();
        }
        break;
      case "tmomanga":
        if (this.mangaService.getMangaWebSiteSelected().name != "TmoManga") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[2]));
          this.getMangaTrends();
        }
        break;
      case "lectortmo":
        if (this.mangaService.getMangaWebSiteSelected().name != "LectorTmo") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[3]));
          this.getMangaTrends();
        }
        break;
      case "lectormangaLat":
        if (this.mangaService.getMangaWebSiteSelected().name != "LectorMangaLat") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[4]));
          this.getMangaTrends();
        }
        break;
      case "manwhaLatino":
        if (this.mangaService.getMangaWebSiteSelected().name != "ManwhaLatino") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[5]));
          this.getMangaTrends();
        }
        break;
      default:
        break;
    }
  }

}
