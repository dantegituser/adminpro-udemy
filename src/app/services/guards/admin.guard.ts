import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  // necesitamos el servicio de usuario
  // porqe debo veridficar el role
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {}

  canActivate() {
  if (this._usuarioService.usuario.role === 'ADMIN_ROLE'){
    return true;
  } else {
    console.log('Bloqueado por el admin guard');
    // this.router.navigate(['/login']);
    this._usuarioService.logout();
    return false;
  }
  }
}