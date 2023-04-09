import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { Tab1PageRoutingModule } from './home-routing.module';
import { NgxLoadingModule } from 'ngx-loading';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab1PageRoutingModule,
    NgxLoadingModule.forRoot({})
  ],
  declarations: [HomePage]
})
export class Tab1PageModule {}
