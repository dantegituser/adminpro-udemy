import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import { UsuarioService } from '../usuario/usuario.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuardGuard implements CanActivate {
  constructor(public _usuarioService: UsuarioService,
    public router: Router
    ) {
  }
  canActivate() {
    
    if(this._usuarioService.estaLogueado()){
      console.log('paso el guard');
      return true;
    }else{
      console.log('bloqueado por el guard');
      // si lo bloquea el guard amndamos al login
      this.router.navigate(['/login']);
      return false;
    }
    // solo es para revisar si el usuario puede o no puede verlo
  }
}
