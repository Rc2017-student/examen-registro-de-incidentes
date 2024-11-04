import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VerincidentesPageRoutingModule } from './verincidentes-routing.module';

import { VerincidentesPage } from './verincidentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VerincidentesPageRoutingModule
  ],
  declarations: [VerincidentesPage]
})
export class VerincidentesPageModule {}
