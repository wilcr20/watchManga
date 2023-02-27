import { Component, OnInit } from '@angular/core';
import { InAppBrowserOptions, InAppBrowser, InAppBrowserEventType } from '@awesome-cordova-plugins/in-app-browser/ngx';

@Component({
  selector: 'app-futbol-tv',
  templateUrl: './futbol-tv.page.html',
  styleUrls: ['./futbol-tv.page.scss'],
})
export class FutbolTVPage implements OnInit {

  options: InAppBrowserOptions = {
    location: 'yes',//Or 'no' 
    hidden: 'no', //Or  'yes'
    clearcache: 'no',
    clearsessioncache: 'no',
    zoom: 'yes',//Android only ,shows browser zoom controls 
    hardwareback: 'yes',
    mediaPlaybackRequiresUserAction: 'no',
    shouldPauseOnSuspend: 'no', //Android only   
  };

  constructor(
    private theInAppBrowser: InAppBrowser
  ) { }

  listChannel = [
    {
      name: "https://casadelfutbol.info/player/1/60",
      url: "https://casadelfutbol.info/player/1/60"
    },
    {
      name: "https://casadelfutbol.info/player/4/91",
      url: "https://casadelfutbol.info/player/4/91"
    },
    {
      name: "https://casadelfutbol.tv/player/espn.php",
      url: "https://casadelfutbol.tv/player/espn.php"
    }
  ]

  ngOnInit() {
  }

  openUrl(url: string) {
    console.log(url);
    let target = "_blank";
    let browser = this.theInAppBrowser.create(url, target, this.options);


    browser.on("loadstart").subscribe(() => {
      browser.executeScript({
        code: 'var func = (function f() { var iframes = document.getElementsByTagName("iframe"); var links = document.getElementsByTagName("a"); setInterval(() => { for (var index = 1; index < iframes.length; index++) { iframes[index].style.display = "none"; }; for (var index = 0; index < links.length; index++) { links[index].style.display = "none"; }; }, 50); return f; })()'
      });
    });


    browser.on('loadstop').subscribe(() => {
      browser.executeScript({
        code: 'var func = (function f() { var iframes = document.getElementsByTagName("iframe"); var links = document.getElementsByTagName("a"); setInterval(() => { for (var index = 1; index < iframes.length; index++) { iframes[index].style.display = "none"; }; for (var index = 0; index < links.length; index++) { links[index].style.display = "none"; }; }, 50); return f; })()'
      });
    });
  }
}

