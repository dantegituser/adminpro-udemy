import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

// modulos 
import { PagesComponent } from "./pages.component";
import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";

// rutas
import { PAGES_ROUTES } from "./pages.routes";

// graficas
import { ChartsModule } from 'ng2-charts';

// pipes
import { PipesModule } from "../pipes/pipes.module";

// temporal
import { IncrementadorComponent } from '../components/incrementador/incrementador.component';
import { GraficodonaComponent } from '../components/graficodona/graficodona.component';
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { ProfileComponent } from './profile/profile.component';
import { CommonModule } from '@angular/common';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { ModalUploadComponent } from '../components/modal-upload/modal-upload.component';
import { HospitalesComponent } from './hospitales/hospitales.component';
import { MedicosComponent } from './medicos/medicos.component';
import { MedicoComponent } from './medicos/medico.component';
import { BusquedaComponent } from './busqueda/busqueda.component';


@NgModule({
declarations: [
    PagesComponent,
    DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    IncrementadorComponent,
    GraficodonaComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    ProfileComponent,
    UsuariosComponent,
    ModalUploadComponent,
    HospitalesComponent,
    MedicosComponent,
    MedicoComponent,
    BusquedaComponent
     ],
exports:[
     DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    GraficodonaComponent
],
imports:[
    CommonModule,
     SharedModule,
     PAGES_ROUTES,
     FormsModule,
     ChartsModule,
     PipesModule
]
})
export class PagesModule {}
