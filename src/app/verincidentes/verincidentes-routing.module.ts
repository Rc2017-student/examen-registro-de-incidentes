import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VerincidentesPage } from './verincidentes.page';

const routes: Routes = [
  {
    path: '',
    component: VerincidentesPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VerincidentesPageRoutingModule {}
