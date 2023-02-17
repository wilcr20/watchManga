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
  searchResult:any = [];
  isSearchDone = false;

  constructor(
    private mangaService: MangaService,
    public modalController: ModalController
  ) { }

  ionViewWillEnter() {
    this.seachValue = "";
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

  getImageUrl(url:string){
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

}
