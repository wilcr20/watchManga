import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { HomeManga } from 'src/app/interfaces/homeManga.interface';
import { MangaInfoPage } from 'src/app/pages/manga-info/manga-info.page';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {
  isLoading = false;
  isLoadingTrendsRequest = false;
  mangaList: Array<HomeManga> = [];
  websites = [
    { name: "LeerCapitulo", url: "https://www.leercapitulo.com/", imgUrl: "https://www.leercapitulo.com/assets/6614b1b9/images/logo.png" },
    { name: "TuManhwas", url: "https://tumanhwas.com/", imgUrl: "https://i.imgur.com/VlLoINI.png" },
    { name: "TmoManga", url: "https://tmomanga.com/", imgUrl: "https://tmomanga.com/img/logo.png" },
  ];

  constructor(
    public mangaService: MangaService,
    public modalController: ModalController,
    private alertController: AlertController
  ) {
    this.getMangaTrends()
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

  getImageUrl(url: string) {
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    if (website.name == "LeerCapitulo") {
      return "https://www.leercapitulo.com" + url;
    }
    return url;
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
          this.getMangaTrends();
        }
        break;
      case "tumanhwas":
        if(this.mangaService.getMangaWebSiteSelected().name != "TuManhwas"){
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[1]));
          this.getMangaTrends();
        }
        break;
      case "tmomanga":
        if(this.mangaService.getMangaWebSiteSelected().name != "TmoManga"){
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[2]));
          this.getMangaTrends();
        }
        break;
      default:
        break;
    }
  }

}
