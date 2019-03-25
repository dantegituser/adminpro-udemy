import { Injectable, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalUploadService {

  public tipo: string;
  public id: string;
  public oculto: string = 'oculto';
  // emito el objeto respuesta  servicio de carga de imagen
  public notificacion = new EventEmitter<any>();
  constructor() {
    console.log('modal service listo');
   }
      ocultarModal() {
        this.oculto = 'oculto';
<<<<<<< HEAD
        this.id = null;
        this.tipo = null;
=======
        this.id = '';
        this.tipo = '';
>>>>>>> d3293d44ab6e6524280ec82a423345458b76695b
   }
   mostrarModal(tipo: string, id: string) {
     this.oculto = '';
     this.id = id;
     this.tipo = tipo;

  }
}
