import { Component } from '@angular/core';
import { HomeManga } from 'src/app/interfaces/homeManga.interface';
import { MangaService } from 'src/app/services/manga.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {
  mangaList: Array<HomeManga> = [];
  isLoading = false;
  constructor(
    private mangaService: MangaService
  ) {
    this.getMangaHome()
  }

  getMangaHome() {
    this.isLoading = true;
    this.mangaService.getHomeManga().subscribe((data: any) => {
      this.isLoading = false;
      this.mangaList = data.data;
    }, (err) => {
      this.isLoading = false;
      console.log(err);
    })
  }

  getImageUrl(img: string){
    return "https://www.leercapitulo.com"+img;
  }

}
