import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MangaService {

  constructor(public httpClient: HttpClient) { }

  getHomeManga() {
    return this.httpClient.get(environment.apiUrl + 'home');
  }

  getTrendsManga() {
    return this.httpClient.get(environment.apiUrl + 'trends');
  }

  getMangaInfo(data: any) {
    return this.httpClient.post(environment.apiUrl + 'mangaInfo', data);
  }

  searchMangaTerm(search: string) {
    let params = new HttpParams().set('term', search);
    return this.httpClient.get(environment.apiUrl + 'search', { params: params });
  }
  
}
