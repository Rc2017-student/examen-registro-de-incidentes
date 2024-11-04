import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddincidentesPageRoutingModule } from './addincidentes-routing.module';

import { AddincidentesPage } from './addincidentes.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddincidentesPageRoutingModule
  ],
  declarations: [AddincidentesPage]
})
export class AddincidentesPageModule {}
