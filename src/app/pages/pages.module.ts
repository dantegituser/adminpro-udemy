import { FormsModule } from "@angular/forms";
import { NgModule } from "@angular/core";

//modulos 
import { PagesComponent } from "./pages.component";
import { SharedModule } from "../shared/shared.module";

import { DashboardComponent } from "./dashboard/dashboard.component";
import { ProgressComponent } from "./progress/progress.component";
import { Graficas1Component } from "./graficas1/graficas1.component";

//rutas
import { PAGES_ROUTES } from "./pages.routes";

//graficas
import { ChartsModule } from 'ng2-charts';

//temporal 
import { IncrementadorComponent } from "../components/incrementador/incrementador.component";
import { GraficodonaComponent } from "../components/graficodona/graficodona.component";
import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';

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
    RxjsComponent
     ],
exports:[
     DashboardComponent,
    ProgressComponent,
    Graficas1Component,
    GraficodonaComponent
],
imports:[
     SharedModule,
     PAGES_ROUTES,
     FormsModule,
     ChartsModule
]
})
export class PagesModule {}