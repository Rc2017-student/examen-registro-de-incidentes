import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-perfil',
  templateUrl: 'perfil.page.html',
  styleUrls: ['perfil.page.scss'],
})
export class PerfilPage {
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  verDatos: boolean = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.cargarDatosUsuario();
  }

  // Función para cargar los datos del usuario desde el localStorage
  cargarDatosUsuario() {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');

    // Solo cargar si los datos existen
    if (currentUser && currentUser.username) {
      this.firstName = currentUser.firstName || '';
      this.lastName = currentUser.lastName || '';
      this.username = currentUser.username || '';
    }
  }

  saveProfile() {
    if (!this.firstName || !this.lastName || !this.username) {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (this.newPassword && this.newPassword !== this.confirmNewPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const updatedUser = {
      ...JSON.parse(localStorage.getItem('currentUser') || '{}'),
      firstName: this.firstName,
      lastName: this.lastName,
      username: this.username,
      password: this.newPassword || JSON.parse(localStorage.getItem('currentUser') || '{}').password
    };

    // Actualizar la información del usuario en el almacenamiento local
    const registeredUsers = JSON.parse(localStorage.getItem('registeredUsers') || '[]');
    const userIndex = registeredUsers.findIndex((user: any) => user.username === updatedUser.username);

    if (userIndex !== -1) {
      registeredUsers[userIndex] = updatedUser;
    } else {
      registeredUsers.push(updatedUser);
    }

    localStorage.setItem('registeredUsers', JSON.stringify(registeredUsers));
    localStorage.setItem('currentUser', JSON.stringify(updatedUser));

    alert('¡Perfil actualizado con éxito!');
    this.cargarDatosUsuario(); // Recargar los datos actualizados
    this.toggleRegisterMode(); // Volver al modo de visualización
  }

  // Función para manejar la navegación
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }

  // Alterna entre el modo de visualización y edición
  toggleRegisterMode() {
    this.verDatos = !this.verDatos;

    // Si se vuelve al modo de visualización, recargar los datos
    if (!this.verDatos) {
      this.cargarDatosUsuario();
    }
  }
}
