import { Component } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';
import { MangaService } from 'src/app/services/manga.service';
import { MangaInfoPage } from '../manga-info/manga-info.page';

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

  websites = [
    { name: "LeerCapitulo", url: "https://www.leercapitulo.com/", imgUrl: "https://www.leercapitulo.com/assets/00810181/images/logo.png" },
    { name: "TuManhwas", url: "https://tumanhwas.com/", imgUrl: "https://i.imgur.com/VlLoINI.png" },
    { name: "TmoManga", url: "https://tmomanga.com/", imgUrl: "https://tmomanga.com/img/logo.png" },
    { name: "LectorTmo", url: "https://lectortmo.com/", imgUrl: "data:image/png;base64,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" },
  ];

  constructor(
    public mangaService: MangaService,
    public modalController: ModalController,
    private alertController: AlertController
  ) { }

  ionViewWillEnter() {
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
    if (manga.website == "leercapitulo") {
      return "https://www.leercapitulo.com" + manga.imageUrl;
    }
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
