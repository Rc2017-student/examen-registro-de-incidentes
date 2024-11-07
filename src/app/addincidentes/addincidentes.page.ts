import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { IonDatetimeModalComponent } from './ion-datetime-modal/ion-datetime-modal.component';

@Component({
  selector: 'app-addincidentes',
  templateUrl: './addincidentes.page.html',
  styleUrls: ['./addincidentes.page.scss'],
})
export class AddincidentesPage {
  pageTitle: string = 'Menú Principal'; // Título fijo
  tipoIncidente: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  fechaHora: string = '';
  fotoUrl: string = '';
  prioridad: string = '';

  incidentes: {
    tipoIncidente: string,
    descripcion: string,
    ubicacion: string,
    fechaHora: string,
    fotoUrl: string,
    prioridad: string
  }[] = [];

  constructor(private router: Router, private modalController: ModalController) {
    // Cargar incidentes del localStorage al iniciar la página
    let incidentesGuardados = localStorage.getItem('incidentes');
    if (incidentesGuardados) {
      this.incidentes = JSON.parse(incidentesGuardados);
    }
  }

  // Función para abrir el modal de selección de fecha y hora
  async openDatePicker() {
    const modal = await this.modalController.create({
      component: IonDatetimeModalComponent,
      componentProps: { selectedDate: this.fechaHora }
    });

    // Obtiene la fecha seleccionada cuando el modal se cierra
    modal.onDidDismiss().then((data) => {
      if (data.data) {
        this.fechaHora = data.data;
      }
    });

    await modal.present();
  }

  guardarIncidente() {
    // Verificar que todos los campos estén llenos
    if (!this.tipoIncidente || !this.descripcion || !this.ubicacion || !this.fechaHora || !this.fotoUrl || !this.prioridad) {
      alert('Por favor, llena todos los campos');
      return;
    }

    // Agregar el nuevo incidente a la lista
    this.incidentes.push({
      tipoIncidente: this.tipoIncidente,
      descripcion: this.descripcion,
      ubicacion: this.ubicacion,
      fechaHora: this.fechaHora,
      fotoUrl: this.fotoUrl,
      prioridad: this.prioridad
    });

    // Limpiar los campos del formulario
    this.tipoIncidente = '';
    this.descripcion = '';
    this.ubicacion = '';
    this.fechaHora = '';
    this.fotoUrl = '';
    this.prioridad = '';

    // Guardar la lista de incidentes en el localStorage
    localStorage.setItem('incidentes', JSON.stringify(this.incidentes));
    alert('Incidente guardado exitosamente');
  }

  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
