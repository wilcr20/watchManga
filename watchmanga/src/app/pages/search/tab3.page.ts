import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MangaService } from 'src/app/services/manga.service';
import { MangaInfoPage } from '../manga-info/manga-info.page';
import websites from '../../data/websites.json';
import lectorTMO from '../../data/categories/lectorTMO.json';
import leerCapitulo from '../../data/categories/leerCapitulo.json';
import tuManhwas from '../../data/categories/tuManhwas.json';
import tmoManga from '../../data/categories/tmoManga.json';


@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {

  isLoading = false;
  seachValue = ""
  searchResult: any = [];
  isSearchDone = false;
  isSearchByCategory = false;
  websites: any;
  categories: any[] = [];

  constructor(
    public mangaService: MangaService,
    public modalController: ModalController,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
    this.websites = websites.data;
    localStorage.setItem("mangasUrls", JSON.stringify(this.websites));
    this.updateCategoryList();
    this.seachValue = "";
    this.isSearchByCategory = false;
    this.searchResult = [];
    this.isSearchDone = false;
  }

  updateCategoryList() {
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    this.categories = [];
    console.log(website);

    switch (website.name) {
      case "LectorTmo":
        this.categories = lectorTMO.data;
        break;
      case "LeerCapitulo":
        this.categories = leerCapitulo.data;
        break;
      case "TuManhwas":
        this.categories = tuManhwas.data;
        break;
      case "TmoManga":
        this.categories = tmoManga.data;
        break;
      default:
        break;
    }
  }

  setValue() {
    if (this.seachValue.trim() == "") {
      this.isSearchDone = false;
      this.searchResult = [];
    } else if (this.seachValue.trim() != "" && this.seachValue.length > 2) {
      this.mangaService.searchMangaTerm(this.seachValue)?.subscribe((data: any) => {
        this.isSearchDone = true;
        this.searchResult = data.data;

      })
    }
  }

  getImageUrl(manga: any) {
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
    });
    return await modal.present();
  }

  searchByGenreSelected(url: string) {
    this.isLoading = true;
    this.mangaService.searchMangaGenre(url)?.subscribe((data: any) => {
      this.isLoading = false
      this.isSearchByCategory = true;
      this.searchResult = data.data;
    }, (err) => {
      this.isLoading = false;
    })
  }

  goToSearchPage() {
    this.searchResult = [];
    this.isSearchByCategory = false;
    this.isSearchDone = false;
    this.seachValue = "";
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
        {
          label: 'LectorTMO',
          type: 'radio',
          value: 'lectortmo',
        },
      ],
    });

    await alert.present();
  }

  updateWebsite(data: string) {
    this.goToSearchPage();
    switch (data) {
      case "leercapitulo":
        if (this.mangaService.getMangaWebSiteSelected().name != "LeerCapitulo") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[0]));
          this.updateCategoryList();
        }
        break;
      case "tumanhwas":
        if (this.mangaService.getMangaWebSiteSelected().name != "TuManhwas") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[1]));
          this.updateCategoryList();
        }
        break;
      case "tmomanga":
        if (this.mangaService.getMangaWebSiteSelected().name != "TmoManga") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[2]));
          this.updateCategoryList();
        }
        break;
      case "lectortmo":
        if (this.mangaService.getMangaWebSiteSelected().name != "LectorTmo") {
          localStorage.setItem("websiteSelected", JSON.stringify(this.websites[3]));
          this.updateCategoryList();
        }
        break;
      default:
        break;
    }
  }

}
