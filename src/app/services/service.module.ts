import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ModalUploadService } from '../components/modal-upload/modal-upload.service';

<<<<<<< HEAD

=======
>>>>>>> d3293d44ab6e6524280ec82a423345458b76695b
import { SettingsService,
  SidebarService,
  SharedService,
UsuarioService,
LoginGuardGuard,
<<<<<<< HEAD
HospitalService,
=======
>>>>>>> d3293d44ab6e6524280ec82a423345458b76695b
SubirArchivoService } from './service.index';


@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [ SettingsService,
    SidebarService,
    SharedService,
    UsuarioService,
  LoginGuardGuard,
  SubirArchivoService,
<<<<<<< HEAD
  ModalUploadService,
  HospitalService
=======
  ModalUploadService
>>>>>>> d3293d44ab6e6524280ec82a423345458b76695b
  ],
  declarations: []
})
export class ServiceModule { }
