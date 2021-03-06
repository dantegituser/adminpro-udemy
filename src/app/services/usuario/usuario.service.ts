import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { HttpClient } from '@angular/common/http';
import { URL_SERVICIOS } from 'src/app/config/config';
import { map } from 'rxjs/operators';
import { SubirArchivoService } from '../subir-archivo/subir-archivo.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;
  menu: any = [];

  constructor(
    public http: HttpClient,
    public router: Router,
    public _subirArchivoService: SubirArchivoService
  ) {

    // console.log('servicio listo');

    // cargamos del localstorage el token y usuario si hay para validar el guard
    this.cargarStorage();
   }

   renuevaToken() {
     let url = URL_SERVICIOS + '/login/renuevatoken';
     url += '?token=' + this.token;
     return this.http.get( url )
     .map( (resp: any) => {
       this.token = resp.token;
       localStorage.setItem('token', this.token);
       console.log('token renovado');
       return true;
     }).catch( err => {
       this.router.navigate(['/login']);
      swal('No se pudo renovar token ', 'no fue posible renovar token', 'error');
      return Observable.throw( err );
    });
   }

   estaLogueado() {
    return (this.token.length > 5 ) ? true : false;
   }

   cargarStorage() {
     if (localStorage.getItem('token')) {
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
      this.token = localStorage.getItem('token');
      this.menu = JSON.parse(localStorage.getItem('menu'));
     } else {
       this.token = '';
       this.usuario = null;
       this.menu = [];
     }
   }
   guardarStorage(id: string, token: string, usuario: Usuario, menu: any) {
    localStorage.setItem('id', id);
      localStorage.setItem('token', token);
      localStorage.setItem('usuario', JSON.stringify(usuario));
      localStorage.setItem('menu', JSON.stringify(menu));

      this.usuario = usuario;
      this.token = token;
      this.menu = menu;
   }
   logout() {
     this.usuario = null;
     this.token = '';
     this.menu = [];

     // localstorage.clear() BORRA TODO!!! NO USAR
     localStorage.removeItem('token');
     localStorage.removeItem('usuario');
     localStorage.removeItem('menu');
     // para la redicreccion podemos usar el window.location o el router
     this.router.navigate(['/login']);
   }
loginGoogle(token: string) {
  let url = URL_SERVICIOS + '/login/google';
  // hacemos la peticion post
  return this.http.post(url, {token: token})
  .map((resp: any) => {
    this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);
    // console.log(resp);
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
    let url = URL_SERVICIOS + '/login';
    // retornamos la respuesta de la peticion que hicimos
    // con el operador map guardamos en localstorage
    return this.http.post(url, usuario)
    .map((resp: any) => {
      this.guardarStorage( resp.id, resp.token, resp.usuario, resp.menu);

      // regresamos true de que si se logueo
      return true;
    }).catch( err => {
      console.log( err.error.mensaje );
      swal('Error en el login', err.error.mensaje, 'error');
      return Observable.throw( err );
    });

  }

   crearUsuario(usuario: Usuario) {
     let url = URL_SERVICIOS + '/usuario';
     // hacemos la peticion y nos suscribimos
     return this.http.post(url, usuario)
     .map((resp: any) => {
       swal('Usuario creado' , usuario.email, 'success');
       return resp.usuario;
     }).catch( err => {
      console.log( err.error.mensaje );
      swal(err.error.mensaje, err.error.errors.message , 'error');
      return Observable.throw( err );
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
       if ( usuario._id === this.usuario._id) {
        let usuarioDb: Usuario = resp.usuario;
        this.guardarStorage(usuarioDb._id, this.token, usuarioDb, this.menu);
       }
       swal('Usuario actualizado', usuario.nombre, 'success');
       return true;
     }).catch( err => {
      console.log( err.error.mensaje );
      swal(err.error.mensaje, err.error.errors.message , 'error');
      return Observable.throw( err );
    });
    }

    cambiarImagen(archivo: File, id: string) {
     this._subirArchivoService.subirArchivo(archivo, 'usuarios', id)
      .then((resp: any) => {
        console.log(resp);
          this.usuario.img = resp.usuario.img;
          swal('Imagen Actualizada', this.usuario.nombre, 'success');
          this.guardarStorage(id, this.token, this.usuario, this.menu);
      })
      .catch(resp => {
        console.log(resp);
      });
    }

    cargarUsuarios(desde: number = 0) {
        let url = URL_SERVICIOS + '/usuario?desde=' + desde;
        return this.http.get(url);

    }
    buscarUsuario( termino: string) {
      let url = URL_SERVICIOS + '/busqueda/coleccion/usuarios/' + termino;
      return this.http.get(url)
      .map((resp: any) => resp.usuarios);
    }
    borrarUsuario( id: string) {
      let url = URL_SERVICIOS + '/usuario/' + id;
      url += '?token=' + this.token;
      return this.http.delete( url )
      .map( resp => {
        swal('Usuario borrado', 'El usuario ha sido eliminado correctamente', 'success');
        return true;
      });
    }
}