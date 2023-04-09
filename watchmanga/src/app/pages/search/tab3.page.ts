import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MangaService } from 'src/app/services/manga.service';
import { MangaInfoPage } from '../manga-info/manga-info.page';
import websites from '../../data/websites.json';

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
  categories_1 = [
    {
      name: "Acción",
      url: "accion/",
    },
    {
      name: "Animación",
      url: "animacion/"
    },
    {
      name: "Apocalíptico",
      url: "apocalíptico/"
    },
    {
      name: "Artes marciales",
      url: "artes-marciales/"
    },
    {
      name: "Aventura",
      url: "aventura/"
    },
    {
      name: "Ciencia Ficción",
      url: "ciencia-ficcion/"
    },
    {
      name: "Comedia",
      url: "comedia/"
    },
    {
      name: "Crimen",
      url: "crimen/"
    },
    {
      name: "Demonios",
      url: "demonios/"
    },
    // Deportes
    {
      name: "Drama",
      url: "drama/"
    },
    {
      name: "Ecchi",
      url: "ecchi/"
    },
    // Extranjero, Familia
    {
      name: "Fantasía",
      url: "fantasia/"
    },
    // Bender, Girls love
    {
      name: "Gore",
      url: "gore/"
    },
    // Guerra
    {
      name: "Harem",
      url: "harem/"
    },
    // Historia
    {
      name: "Horror",
      url: "horror/"
    },
    {
      name: "Magia",
      url: "magia/"
    },
    {
      name: "Mecha",
      url: "mecha/"
    },
    // Militar
    {
      name: "Misterio",
      url: "misterio/"
    },
    // Musica, Niños, Oeste
    {
      name: "Parodia",
      url: "parodia/"
    },
    // Policiaco
    {
      name: "Psicológico",
      url: "psicologico/"
    },
    // Realidad, RV, 
    {
      name: "Slice of life",
      url: "recuentos-de-la-vida/"
    },
    {
      name: "Reencarnación",
      url: "reencarnacion/"
    },
    {
      name: "Romance",
      url: "romance/"
    },
    // Samurai
    {
      name: "Sobrenatural",
      url: "sobrenatural/"
    },
    {
      name: "Superpoderes",
      url: "superpoderes/"
    },
    {
      name: "Supervivencia",
      url: "supervivencia/"
    },
    // Telenovela
    {
      name: "Thriller",
      url: "thriller/"
    },
    {
      name: "Tragedia",
      url: "tragedia/"
    },
    {
      name: "Vampiros",
      url: "vampiros/"
    },
    {
      name: "Vida Escolar",
      url: "vida-escolar/"
    }
  ];

  categories_LectorTMO = [
    {
      name: "Acción",
      url: 1
    },
    {
      name: "Animación",
      url: 40
    },
    {
      name: "Apocalíptico",
      url: 24
    },
    {
      name: "Artes marciales",
      url: 33
    },
    {
      name: "Aventura",
      url: 2
    },
    {
      name: "Ciencia Ficción",
      url: 14
    },
    {
      name: "Comedia",
      url: 3
    },
    {
      name: "Crimen",
      url: 30
    },
    {
      name: "Demonios",
      url: 41
    },
    // Deportes
    {
      name: "Drama",
      url: 4
    },
    {
      name: "Ecchi",
      url: 6
    },
    // Extranjero, Familia
    {
      name: "Fantasía",
      url: 7
    },
    {
      name: "Girls love",
      url: 17
    },
    // Bender, Girls love
    {
      name: "Gore",
      url: 23
    },
    // Guerra
    {
      name: "Harem",
      url: 19
    },
    // Historia
    {
      name: "Horror",
      url: 10
    },
    {
      name: "Magia",
      url: 8
    },
    {
      name: "Mecha",
      url: 20
    },
    // Militar
    {
      name: "Misterio",
      url: 11
    },
    // Musica, Niños, Oeste
    {
      name: "Parodia",
      url: 39
    },
    // Policiaco
    {
      name: "Psicológico",
      url: 12
    },
    // Realidad, RV, 
    {
      name: "Slice of life",
      url: 5
    },
    {
      name: "Reencarnación",
      url: 22
    },
    {
      name: "Romance",
      url: 13
    },
    // Samurai
    {
      name: "Sobrenatural",
      url: 9
    },
    {
      name: "Superpoderes",
      url: 31
    },
    {
      name: "Supervivencia",
      url: 21
    },
    // Telenovela
    {
      name: "Thriller",
      url: 15
    },
    {
      name: "Tragedia",
      url: 25
    },
    {
      name: "Vampiros",
      url: 32
    },
    {
      name: "Vida Escolar",
      url: 26
    }
  ];


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

  updateCategoryList(){
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    if(website.name == "LectorTmo"){
      this.categories = this.categories_LectorTMO;
    }else{
      this.categories = this.categories_1;
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
