import { Component } from '@angular/core';
import { ModalController } from '@ionic/angular';
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
  categories = [
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

  constructor(
    private mangaService: MangaService,
    public modalController: ModalController
  ) { }

  ionViewWillEnter() {
    this.seachValue = "";
    this.isSearchByCategory = false;
    this.searchResult = [];
    this.isSearchDone = false;
  }

  setValue() {
    if (this.seachValue.trim() == "") {
      this.isSearchDone = false;
      this.searchResult = [];
    } else if (this.seachValue.trim() != "" && this.seachValue.length > 2) {
      this.mangaService.searchMangaTerm(this.seachValue).subscribe((data: any) => {
        this.isSearchDone = true;
        this.searchResult = data;
        console.log("- ", this.searchResult);
      })
    }
  }

  getImageUrl(url: string) {
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
    });
    return await modal.present();
  }

  searchByGenreSelected(url: string) {
    this.isLoading = true;
    this.mangaService.searchMangaGenre(url).subscribe((data: any) => {
      this.isLoading = false
      this.isSearchByCategory = true;
      this.searchResult = data.data;
      console.log(this.searchResult);
    }, (err) => { 
      this.isLoading = false;
     })
  }

  goToSearchPage(){
    this.searchResult = [];
    this.isSearchByCategory = false;
    this.isSearchDone = false;
  }

}
