import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { FutbolTVPageRoutingModule } from './futbol-tv-routing.module';

import { FutbolTVPage } from './futbol-tv.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    FutbolTVPageRoutingModule
  ],
  declarations: [FutbolTVPage]
})
export class FutbolTVPageModule {}
