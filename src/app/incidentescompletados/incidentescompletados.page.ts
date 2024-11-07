import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { NotificacionesPage } from '../notificaciones/notificaciones.page';

@Component({
  selector: 'app-incidentescompletados',
  templateUrl: './incidentescompletados.page.html',
  styleUrls: ['./incidentescompletados.page.scss'],
})
export class IncidentescompletadosPage implements OnInit {
  indice: number = 0;
  incidentes: {
    id: number;
    tipoIncidente: string;
    descripcion: string;
    ubicacion: string;
    fechaHora: string;
    fotoUrl: string;
    prioridad: string;
  }[] = [];

  incidentesFiltrados: {
    id: number;
    tipoIncidente: string;
    descripcion: string;
    ubicacion: string;
    fechaHora: string;
    fotoUrl: string;
    prioridad: string;
  }[] = [];

  incidentesCompletados: {
    id: number;
    tipoIncidente: string;
    descripcion: string;
    ubicacion: string;
    fechaHora: string;
    fotoUrl: string;
    prioridad: string;
  }[] = [];

  filtroTipo: string = '';
  filtroUbicacion: string = '';
  filtroPrioridad: string = '';

  tiposDisponibles: string[] = [];
  ubicacionesDisponibles: string[] = [];

    constructor(
      private router: Router, 
      private alertController: AlertController, 
      public notificacionesPage: NotificacionesPage
    ) {  }
  // Mostrar estadísticas de incidentes completados
  async mostrarEstadisticas() {
    this.notificacionesPage.incrementarContador();
    const totalIncidentes = this.incidentes.length;
    const completados = this.incidentesCompletados.length;
    const porcentajeCompletados = (completados / totalIncidentes) * 100;

    // Contar incidentes por categoría y área
    const estadisticasCategoria: { [key: string]: number } = {};
    const estadisticasArea: { [key: string]: number } = {};

    this.incidentesCompletados.forEach(incidente => {
      // Contar por categoría
      estadisticasCategoria[incidente.tipoIncidente] = (estadisticasCategoria[incidente.tipoIncidente] || 0) + 1;
      // Contar por área
      estadisticasArea[incidente.ubicacion] = (estadisticasArea[incidente.ubicacion] || 0) + 1;
    });

    // Formatear los datos para mostrar en el alert
    const mensajeEstadisticas =
      `
    Porcentaje de incidentes completados: ${porcentajeCompletados.toFixed(2)}%\n
    \n\nInciendentes por Categoría:\n\n${Object.entries(estadisticasCategoria).map(([categoria, count]) => `- ${categoria}: ${count}`).join('\n')}
    \n\nInciendentes por Área:\n\n${Object.entries(estadisticasArea).map(([area, count]) => `- ${area}: ${count}`).join('\n')}
  `;

    // Mostrar alert con estadísticas
    const alert = await this.alertController.create({
      header: 'Estadísticas de Incidentes',
      message: mensajeEstadisticas,
      buttons: ['OK']
    });

    await alert.present();
  }
  ngOnInit() {
    let incidentesCompletado = localStorage.getItem('incidentesCompletados')
    if (incidentesCompletado) {
      this.incidentesCompletados = JSON.parse(incidentesCompletado);
    }
    // Cargar incidentes del localStorage
    let incidentesGuardados = localStorage.getItem('incidentesCompletados');
    if (incidentesGuardados) {
      this.incidentes = JSON.parse(incidentesGuardados);

      // Ordenar los incidentes por prioridad (alta, media, baja)
      this.incidentes.sort((a, b) => this.ordenarPorPrioridad(a.prioridad, b.prioridad));
      this.incidentesFiltrados = [...this.incidentesCompletados];

      // Obtener listas únicas de tipos y ubicaciones para los filtros
      this.tiposDisponibles = Array.from(new Set(this.incidentes.map(inc => inc.tipoIncidente)));
      this.ubicacionesDisponibles = Array.from(new Set(this.incidentes.map(inc => inc.ubicacion)));
    }
  }

  ordenarPorPrioridad(a: string, b: string): number {
    const prioridadValor: { [key: string]: number } = { alta: 3, media: 2, baja: 1 };
    return prioridadValor[b as keyof typeof prioridadValor] - prioridadValor[a as keyof typeof prioridadValor];
  }

  aplicarFiltros() {
    this.incidentesFiltrados = this.incidentesCompletados.filter(incidente => {
      return (
        (!this.filtroTipo || incidente.tipoIncidente === this.filtroTipo) &&
        (!this.filtroUbicacion || incidente.ubicacion === this.filtroUbicacion) &&
        (!this.filtroPrioridad || incidente.prioridad === this.filtroPrioridad)
      );
    });
  }

  restablecerLista() {
    // Restablecer los valores de los filtros
    this.filtroTipo = '';
    this.filtroUbicacion = '';
    this.filtroPrioridad = '';

    // Restaurar la lista original de incidentes
    this.incidentesFiltrados = [...this.incidentesCompletados];
  }
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
  Completar(id: number) {
    for (let i = 0; i <= this.incidentesFiltrados.length - 1; i++) {
      if (this.incidentesFiltrados[i].id === id)
        this.indice = i;
    }
    console.log(this.indice);
    let incidente = this.incidentesFiltrados[this.indice]; //Añadir a incientes completados
    console.log(incidente);//ver incidente completado
    this.incidentesCompletados.push(incidente);
    localStorage.setItem('incidentesCompletados', JSON.stringify(this.incidentesCompletados));
    this.incidentesFiltrados.splice(this.indice, 1);
    localStorage.setItem('incidentes', JSON.stringify(this.incidentesFiltrados));
  }
  Borrar(id: number) {
    console.log("hosafsdfsd");
    for (let i = 0; i <= this.incidentesFiltrados.length - 1; i++) {
      if (this.incidentesFiltrados[i].id === id)
        this.indice = i;
    }
    console.log(this.indice);
    this.incidentesFiltrados.splice(this.indice, 1);
    localStorage.setItem('incidentes', JSON.stringify(this.incidentesFiltrados));
  }
}