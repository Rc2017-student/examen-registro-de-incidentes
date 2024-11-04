import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-verincidentes',
  templateUrl: './verincidentes.page.html',
  styleUrls: ['./verincidentes.page.scss'],
})
export class VerincidentesPage implements OnInit {
  incidentes: {
    tipoIncidente: string;
    descripcion: string;
    ubicacion: string;
    fechaHora: string;
    fotoUrl: string;
    prioridad: string;
  }[] = [];

  incidentesFiltrados: {
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

  constructor(private router: Router) {}

  ngOnInit() {
    // Cargar incidentes del localStorage
    let incidentesGuardados = localStorage.getItem('incidentes');
    if (incidentesGuardados) {
      this.incidentes = JSON.parse(incidentesGuardados);
      // Ordenar los incidentes por prioridad (alta, media, baja)
      this.incidentes.sort((a, b) => this.ordenarPorPrioridad(a.prioridad, b.prioridad));
      this.incidentesFiltrados = [...this.incidentes];

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
    this.incidentesFiltrados = this.incidentes.filter(incidente => {
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
    this.incidentesFiltrados = [...this.incidentes];
  }
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
