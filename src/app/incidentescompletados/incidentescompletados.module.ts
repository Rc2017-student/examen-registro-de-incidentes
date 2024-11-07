import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IncidentescompletadosPageRoutingModule } from './incidentescompletados-routing.module';

import { IncidentescompletadosPage } from './incidentescompletados.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    IncidentescompletadosPageRoutingModule
  ],
  declarations: [IncidentescompletadosPage]
})
export class IncidentescompletadosPageModule {}
