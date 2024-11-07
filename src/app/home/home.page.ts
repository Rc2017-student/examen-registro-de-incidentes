import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  // Variables para el modo de registro e inicio de sesión
  isRegisterMode: boolean = false;
  firstName: string = '';
  lastName: string = '';
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  rememberMe: boolean = false;

  registeredUsers: { username: string, password: string }[] = [];

  constructor(private router: Router) {
    // Verifica si hay un nombre de usuario guardado en el almacenamiento local
    const savedUsername = localStorage.getItem('savedUsername');
    if (savedUsername) {
      this.username = savedUsername;
      this.rememberMe = true;
    }
  }

  ngOnInit() {
    // Obtiene los usuarios registrados del almacenamiento local
    const users = localStorage.getItem('registeredUsers');
    if (users) {
      this.registeredUsers = JSON.parse(users);
    }
  }

  // Lógica de inicio de sesión
  login() {
    if (this.username === '' || this.password === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    const user = this.registeredUsers.find(
      user => user.username === this.username && user.password === this.password
    );

    if (user) {
      if (this.rememberMe) {
        localStorage.setItem('savedUsername', this.username);
      } else {
        localStorage.removeItem('savedUsername');
      }
      alert('¡Inicio de sesión exitoso!');
      localStorage.setItem('currentUser', JSON.stringify(user));
      this.router.navigate(['/menuprincipal']);
    } else {
      alert('Nombre de usuario o contraseña incorrectos');
    }
  }

  // Lógica de registro de nuevos usuarios
  register() {
    if (this.username === '' || this.password === '' || this.confirmPassword === '' || this.firstName === '' || this.lastName === '') {
      alert('Por favor, completa todos los campos');
      return;
    }

    if (this.password !== this.confirmPassword) {
      alert('Las contraseñas no coinciden');
      return;
    }

    const userExists = this.registeredUsers.some(user => user.username === this.username);
    if (userExists) {
      alert('El nombre de usuario ya está en uso');
      return;
    }

    // Registra al nuevo usuario
    this.registeredUsers.push({ username: this.username, password: this.password });
    localStorage.setItem('registeredUsers', JSON.stringify(this.registeredUsers));
    alert('¡Registro exitoso! Ahora puedes iniciar sesión.');
    this.toggleRegisterMode(); // Cambia al modo de inicio de sesión
  }

  // Alterna entre el modo de registro e inicio de sesión
  toggleRegisterMode() { 
    this.isRegisterMode = !this.isRegisterMode;
  }
}
