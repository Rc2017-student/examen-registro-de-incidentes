import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentescompletadosPage } from './incidentescompletados.page';

const routes: Routes = [
  {
    path: '',
    component: IncidentescompletadosPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class IncidentescompletadosPageRoutingModule {}
