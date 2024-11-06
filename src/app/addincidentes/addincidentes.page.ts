import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-addincidentes',
  templateUrl: './addincidentes.page.html',
  styleUrls: ['./addincidentes.page.scss'],
})
export class AddincidentesPage {
  id: number = 0;
  tipoIncidente: string = '';
  descripcion: string = '';
  ubicacion: string = '';
  fechaHora: string = '';
  fotoUrl: string = '';
  prioridad: string = '';

  incidentes: {
    id: number;
    tipoIncidente: string,
    descripcion: string,
    ubicacion: string,
    fechaHora: string,
    fotoUrl: string,
    prioridad: string
  }[] = [];

  constructor(private router: Router) {
    // Cargar incidentes del localStorage al iniciar la página
    let incidentesGuardados = localStorage.getItem('incidentes');
    if (incidentesGuardados) {
      this.incidentes = JSON.parse(incidentesGuardados);
    }
  }

  guardarIncidente() {
    // Verificar que todos los campos estén llenos
    if (!this.tipoIncidente || !this.descripcion || !this.ubicacion || !this.fechaHora || !this.fotoUrl || !this.prioridad) {
      alert('Por favor, llena todos los campos');
      return;
    }

    // Agregar el nuevo incidente a la lista
    this.incidentes.push({
      id: Date.now(),
      tipoIncidente: this.tipoIncidente,
      descripcion: this.descripcion,
      ubicacion: this.ubicacion,
      fechaHora: this.fechaHora,
      fotoUrl: this.fotoUrl,
      prioridad: this.prioridad
    });
    // Notificar adición de nuevo incidente
    let notificaciones = JSON.parse(localStorage.getItem('notificaciones') || '[]');
    notificaciones.push({
      mensaje: `Nuevo incidente agregado: ${this.tipoIncidente}`,
      fecha: new Date().toLocaleString()
    });
    localStorage.setItem('notificaciones', JSON.stringify(notificaciones));

    alert('Incidente guardado exitosamente');
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
