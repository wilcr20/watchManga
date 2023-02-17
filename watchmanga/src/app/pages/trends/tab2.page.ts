import { Component } from '@angular/core';
import { HomeManga } from 'src/app/interfaces/homeManga.interface';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  mangaList: Array<HomeManga> = [];
  constructor(
    private mangaService: MangaService
  ) {
    this.getMangaTrends()
  }

  getMangaTrends() {
    this.mangaService.getTrendsManga().subscribe((data: any) => {
      this.mangaList = data.data;
    }, (err) => {
      console.log(err);
    })
  }

  getImageUrl(img: string){
    return "https://www.leercapitulo.com"+img;
  }

}
