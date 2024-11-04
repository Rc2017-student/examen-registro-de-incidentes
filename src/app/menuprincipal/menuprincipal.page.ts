import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menuprincipal',
  templateUrl: './menuprincipal.page.html',
  styleUrls: ['./menuprincipal.page.scss'],
})
export class MenuprincipalPage implements OnInit {
  user:{
    firstName: string,
    lastName: string
  } = {
    firstName: '',
    lastName: ''
  }
  constructor(private router: Router) { }

  ngOnInit() {
    // Obtener el usuario actual desde el localStorage
    const currentUser = localStorage.getItem('currentUser');
    if(currentUser){
      this.user = JSON.parse(currentUser)
    }
  }

  // Función para manejar la navegación
  navigateTo(page: string) {
    this.router.navigate([`/${page}`]);
  }
}
