import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrendsPage } from './trends.page';

const routes: Routes = [
  {
    path: '',
    component: TrendsPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class Tab2PageRoutingModule {}
