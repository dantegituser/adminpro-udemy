import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import 'rxjs/add/operator/map';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService;
  ) {

    // console.log('servicio listo');

    //cargamos del localstorage el token y usuario si hay para validar el guard
    this.cargarStorage();
   }

   estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
   }

   cargarStorage() {
     if (localStorage.getItem('token')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
     } else {
       this.token = '';
       this.usuario = null;
     }
   }
   guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));

      this.usuario = usuario;
      this.token = token;
   }
   logout() {
     this.usuario = null;
     this.token = '';

     // localstorage.clear() BORRA TODO!!! NO USAR
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     // para la redicreccion podemos usar el window.location o el router
     this.router.navigate(['/login']);
   }
loginGoogle(token: string) {
  let url = URL_SERVICIOS + '/login/google';
  // hacemos la peticion post
  return this.http.post(url, {token: token})
  .map((resp: any) => {
    this.guardarStorage( resp.id, resp.token, resp.usuario);
    return true;
  });
  // aqui tuvimos q mandar el token dentro d eun OBJETO

}
  login(usuario: Usuario, recordar: boolean = false){

    // para el recordar
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    let url = URL_SERVICIOS+'/login';
    // retornamos la respuesta de la peticion que hicimos
    // con el operador map guardamos en localstorage
    return this.http.post(url, usuario)
    .map((resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario);

      // regresamos true de que si se logueo
      return true;
    });

  }

   crearUsuario(usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario';
     // hacemos la peticion y nos suscribimos
     return this.http.post(url, usuario)
     .map((resp: any) => {
       swal('Usuario creado' , usuario.email, 'success');
       return resp.usuario;
     });
   }

   actualizarUsuario(usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario/' + usuario._id;
     url += '?token=' + this.token;
     // hacemos la informacion put con esta info
     return this.http.put(url, usuario)
     .map( (resp: any) => {
       // this.usuario = resp.usuario; esto no es necesario pq la fucnin
       // guardar storage ya lo hace
       let usuarioDb: Usuario = resp.usuario;
       this.guardarStorage(usuarioDb._id, this.token, usuarioDb);
       swal('Usuario actualizado', usuario.nombre, 'success');
       return true;
     });
    }

    cambiarImagen(archivo: File, id: string) {
     this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        console.log(resp);
          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario);
      })
      .catch(resp => {
        console.log(resp);
      });
    }
}
