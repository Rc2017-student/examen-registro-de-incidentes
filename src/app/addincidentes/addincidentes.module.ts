import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { AddincidentesPageRoutingModule } from './addincidentes-routing.module';
import { AddincidentesPage } from './addincidentes.page';
import { IonDatetimeModalComponent } from './ion-datetime-modal/ion-datetime-modal.component'; // Import the component

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddincidentesPageRoutingModule
  ],
  declarations: [
    AddincidentesPage,
    IonDatetimeModalComponent // Declare the component
  ]
})
export class AddincidentesPageModule {}
