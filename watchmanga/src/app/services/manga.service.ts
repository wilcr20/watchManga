import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  constructor(public httpClient: HttpClient) { }

  getHomeManga() {
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    switch (website.name) {
      case "LeerCapitulo":
        return this.httpClient.get(environment.apiUrl + 'leercapitulo/home');
        break;
      case "TuManhwas":
        return this.httpClient.get(environment.apiUrl + 'tumanhwas/home');
        break;
      case "TmoManga":
        return this.httpClient.get(environment.apiUrl + 'tmomanga/home');
        break;
      default:
        return null;
        break;
    }
  }

  getTrendsManga() {
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    switch (website.name) {
      case "LeerCapitulo":
        return this.httpClient.get(environment.apiUrl + 'leercapitulo/trends');
        break;
      case "TuManhwas":
        return this.httpClient.get(environment.apiUrl + 'tumanhwas/trends');
        break;
      case "TmoManga":
        return this.httpClient.get(environment.apiUrl + 'tmomanga/trends');
        break;
      default:
        return null;
        break;
    }
  }

  getMangaInfo(data: any, website: string) {
    switch (website) {
      case "leercapitulo":
        return this.httpClient.post(environment.apiUrl + 'leercapitulo/mangaInfo', data);
        break;
      case "tumanhwas":
        return this.httpClient.post(environment.apiUrl + 'tumanhwas/mangaInfo', data);
        break;
      case "tmomanga":
        return this.httpClient.post(environment.apiUrl + 'tmomanga/mangaInfo', data);
        break;
      default:
        return null;
        break;
    }
  }

  searchMangaTerm(search: string) {
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    switch (website.name) {
      case "LeerCapitulo":
        let params = new HttpParams().set('term', search);
        return this.httpClient.get(environment.apiUrl + 'leercapitulo/search', { params: params });
        break;
      case "TuManhwas":
        return this.httpClient.post(environment.apiUrl + 'tumanhwas/search', {term: search});
        break;
      case "TmoManga":
        return this.httpClient.post(environment.apiUrl + 'tmomanga/search', {term: search});
        break;
      default:
        return null;
        break;
    }
  }

  searchMangaGenre(genre: string) {
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    switch (website.name) {
      case "LeerCapitulo":
        return this.httpClient.post(environment.apiUrl + 'leercapitulo/searchByGenre', { genre: genre });
        break;
      case "TuManhwas":
        return this.httpClient.post(environment.apiUrl + 'tumanhwas/searchByGenre', { genre: genre });
        break;
      case "TmoManga":
        return this.httpClient.post(environment.apiUrl + 'tmomanga/searchByGenre', { genre: genre });
        break;
      default:
        return null;
        break;
    }
  }

}
