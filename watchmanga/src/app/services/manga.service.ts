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

  getMangaInfo(data: any) {
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    switch (website.name) {
      case "LeerCapitulo":
        return this.httpClient.post(environment.apiUrl + 'leercapitulo/mangaInfo', data);
        break;
      case "TuManhwas":
        return this.httpClient.post(environment.apiUrl + 'tumanhwas/mangaInfo', data);
        break;
      case "TmoManga":
        return this.httpClient.post(environment.apiUrl + 'tmomanga/mangaInfo', data);
        break;
      default:
        return null;
        break;
    }
  }

  searchMangaTerm(search: string) {
    let params = new HttpParams().set('term', search);
    let website = JSON.parse(localStorage.getItem("websiteSelected") as string);
    switch (website.name) {
      case "LeerCapitulo":
        return this.httpClient.get(environment.apiUrl + 'leercapitulo/search', { params: params });
        break;
      case "TuManhwas":
        return this.httpClient.get(environment.apiUrl + 'tumanhwas/search', { params: params });
        break;
      case "TmoManga":
        return this.httpClient.get(environment.apiUrl + 'tmomanga/search', { params: params });
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
