import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SearchPage } from './search.page';
import { NgxLoadingModule } from 'ngx-loading';

import { Tab3PageRoutingModule } from './search-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    Tab3PageRoutingModule,
    NgxLoadingModule.forRoot({})

  ],
  declarations: [SearchPage]
})
export class Tab3PageModule {}
