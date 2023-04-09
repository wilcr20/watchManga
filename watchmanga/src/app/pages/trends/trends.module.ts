import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TrendsPage } from './trends.page';

import { Tab2PageRoutingModule } from './trends-routing.module';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab2PageRoutingModule,
    NgxLoadingModule.forRoot({})

  ],
  declarations: [TrendsPage]
})
export class Tab2PageModule {}
