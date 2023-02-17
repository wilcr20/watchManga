import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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

  
}
