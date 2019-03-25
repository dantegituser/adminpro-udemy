import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../models/usuario.model';
import { UsuarioService } from '../../services/service.index';
import { ModalUploadService } from '../../components/modal-upload/modal-upload.service';
// para el error del swal
declare var swal: any;

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.css']
})
export class UsuariosComponent implements OnInit {

  // llamamos al modelo usuario y que es un array de usuarios
  usuarios: Usuario[] = [];
  desde: number = 0;
  totalRegistros: number = 0;
  cargando: boolean = true;
  constructor( public _usuarioService: UsuarioService,
    public _modalUploadService: ModalUploadService ) {
  }

  ngOnInit() {
    // llamamos la funcion cargarUsuarios al iniciar
    this.cargarUsuarios();
    // nos suscribimos al emitter para poder recargar la pagina
    this._modalUploadService.notificacion
    .subscribe( resp => this.cargarUsuarios());
  }

  cargarUsuarios() {
    this.cargando = true;
      // necesito cargar el servicio de los usuarios, lo llamamos
      this._usuarioService.cargarUsuarios(this.desde)
      .subscribe((resp: any) => {
          console.log(resp);
          this.totalRegistros = resp.total;
          this.usuarios = resp.usuarios;
          this.cargando = false;
      });
  }

  cambiarDesde(valor: number) {
    let desde = this.desde + valor;

    if (desde >= this.totalRegistros) {
      return;
    }
    if (desde < 0) {
      return;
    }
    this.desde += valor;
    this.cargarUsuarios();
  }

  buscarUsuario( termino: string) {
    if ( termino.length <= 0) {
        this.cargarUsuarios();
        return;
    }
    this.cargando = true;

    this._usuarioService.buscarUsuario( termino )
    .subscribe( (usuarios: Usuario[]) => {
      // console.log(usuarios);
      this.usuarios = usuarios;
      this.cargando = false;
    });
  }

  borrarUsuario( usuario: Usuario) {
  if ( usuario._id === this._usuarioService.usuario._id) {
    swal('No se puede borrar usuario', 'No se puede borrar a si mismo', 'error');
    return;
  }
  swal({
    title: '¿Estás seguro?',
    text: 'Está a punto de borrar a ' + usuario.nombre,
    icon: 'warning',
    buttons: true,
    dangerMode: true,
  })
  .then( borrar => {
    if ( borrar ) {
      this._usuarioService.borrarUsuario( usuario._id )
      .subscribe( borrado => {
        console.log(borrado);
        this.cargarUsuarios();
      });
    }
  });
  }

  guardarUsuario(usuario: Usuario) {
    this._usuarioService.actualizarUsuario( usuario)
    .subscribe();
  }

  mostrarModal( id: string) {
    this._modalUploadService.mostrarModal('usuarios', id);
  }

}
