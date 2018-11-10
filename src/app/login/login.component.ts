import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';

declare function init_plugins();
// declaramos la api de google
declare const gapi: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  
  email: string;
  recuerdame: boolean = false;
  // declaro una propiedad para el google sign in
  auth2: any;
  constructor(public router: Router,
    public _usuarioService: UsuarioService) { }

  ngOnInit() {
    init_plugins();
    // llamamos al googleInit
    this.googleInit();
  this.email = localStorage.getItem('email') || '';
  if (this.email.length > 1) {
    this.recuerdame = true;
  }
  }

  // inicializamos todo lo necesario ar el googel sign in - 
  // inicializamos el plugin
  googleInit(){
    gapi.load('auth2', () => {
      // el init recibe un objeto, el id
  this.auth2 = gapi.auth2.init({
    client_id: '169089313651-deh0kmjcna87g8k1h1mbakqg4mp8jt05.apps.googleusercontent.com',
    cookiepolicy: 'single_host_origin',
    scope: 'profile email'
  });
  // llamamos a la funcion attachSignin
  this.attachSignin(document.getElementById('btnGoogle'));
    });
  }
  // atach recibe el elemento html
  attachSignin(elemento){
  this.auth2.attachClickHandler(elemento, {}, (googleUser) => {
    // obtenemos el perfil del usuario pero no nos sirve para nada
    // lo que nos sirve es el token

    // let profile = googleUser.getBasicProfile();
    let token = googleUser.getAuthResponse().id_token;

    // ya que tengo el token podemos usar el servicio login google
    // me tengo que suscribir
    this._usuarioService.loginGoogle(token)
    .subscribe(resp => {
      // corregimos el error
      // this.router.navigate(['/dashboard']);
     window.location.href = '#/dashboard'; 
    });
    
  });
  }
  // recibimos el formulario
  ingresar(forma: NgForm ) {

  if (forma.invalid) {
    return;
  }
  let usuario = new Usuario(null, forma.value.email, forma.value.password);
  // llamamos al servicio y ara q se dispare hay q suscribirse
  this._usuarioService.login(usuario, forma.value.recuerdame)
  .subscribe(correcto => {
    // que hacemos con la respuesta del login del usuario.service.login??
    this.router.navigate(['/dashboard']);
  });

    console.log(forma.valid);
    console.log(forma.value);
    // this.router.navigate(['/dashboard']);
  }

}
