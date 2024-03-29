import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  constructor(public httpClient: HttpClient) { }

  getMangaWebSiteSelected() {
    return JSON.parse(localStorage.getItem("websiteSelected") as string);
  }

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
      case "LectorTmo":
        return this.httpClient.get(environment.apiUrl + 'lectortmo/home');
        break;
      case "LectorMangaLat":
        return this.httpClient.get(environment.apiUrl + 'lectormangalat/home');
        break;
      case "ManwhaLatino":
        return this.httpClient.get(environment.apiUrl + 'manwhaLatino/home');
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
      case "LectorTmo":
        return this.httpClient.get(environment.apiUrl + 'lectortmo/trends');
        break;
      case "LectorMangaLat":
        return this.httpClient.get(environment.apiUrl + 'lectormangalat/trends');
        break;
      case "ManwhaLatino":
        return this.httpClient.get(environment.apiUrl + 'manwhaLatino/trends');
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
        if (!data.mangaUrl.includes("https://tumanhwas.com/manga/")) {
          data.mangaUrl = "https://tumanhwas.com/manga/" + data.mangaUrl;
        }
        return this.httpClient.post(environment.apiUrl + 'tumanhwas/mangaInfo', data);
        break;
      case "tmomanga":
        return this.httpClient.post(environment.apiUrl + 'tmomanga/mangaInfo', data);
        break;
      case "lectortmo":
        return this.httpClient.post(environment.apiUrl + 'lectortmo/mangaInfo', data);
        break;
      case "lectormangaLat":
        return this.httpClient.post(environment.apiUrl + 'lectormangalat/mangaInfo', data);
        break;
      case "manwhaLatino":
        return this.httpClient.post(environment.apiUrl + 'manwhaLatino/mangaInfo', data);
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
        return this.httpClient.post(environment.apiUrl + 'tumanhwas/search', { term: search });
        break;
      case "TmoManga":
        return this.httpClient.post(environment.apiUrl + 'tmomanga/search', { term: search });
        break;
      case "LectorTmo":
        return this.httpClient.post(environment.apiUrl + 'lectortmo/search', { term: search });
        break;
      case "LectorMangaLat":
        return this.httpClient.post(environment.apiUrl + 'lectormangalat/search', { term: search });
        break;
      case "ManwhaLatino":
        return this.httpClient.post(environment.apiUrl + 'manwhaLatino/search', { searchUrl: search });
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
      case "LectorTmo":
        return this.httpClient.post(environment.apiUrl + 'lectortmo/searchByGenre', { genre: genre });
        break;
      case "LectorMangaLat":
        return of({});
        break;
      case "ManwhaLatino":
        return this.httpClient.post(environment.apiUrl + 'manwhaLatino/searchByGenre', { genreUrl: genre });
        break;
      default:
        return null;
        break;
    }
  }

}
