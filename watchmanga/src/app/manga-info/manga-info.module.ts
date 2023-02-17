import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MangaInfoPageRoutingModule } from './manga-info-routing.module';

import { MangaInfoPage } from './manga-info.page';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MangaInfoPageRoutingModule,
    NgxLoadingModule.forRoot({})

  ],
  declarations: [MangaInfoPage]
})
export class MangaInfoPageModule {}
