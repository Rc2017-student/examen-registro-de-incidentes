import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-ion-datetime-modal',
  templateUrl: './ion-datetime-modal.component.html',
})
export class IonDatetimeModalComponent {
  @Input() selectedDate?: string; // Marcar como opcional

  constructor(private modalController: ModalController) {}

  updateDate(event: any) {
    this.selectedDate = event.detail.value;
  }

  dismiss() {
    this.modalController.dismiss(this.selectedDate);
  }
}
