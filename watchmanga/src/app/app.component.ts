import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor() {
    if(localStorage.getItem("favorites")){
      return;
    }else{
      localStorage.setItem("favorites", JSON.stringify([]));
    }
   
  }
}
