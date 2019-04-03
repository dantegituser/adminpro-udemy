import { RouterModule, Routes} from '@angular/router';

// componentes
import { LoginComponent } from './login/login.component';
import { NopagefoundComponent } from './shared/nopagefound/nopagefound.component';
import { RegisterComponent } from './login/register.component';
import { PagesComponent } from './pages/pages.component';
import { LoginGuardGuard } from './services/service.index';


const appRoutes: Routes = [
     {path: 'register', component: RegisterComponent},
     {path: 'login', component: LoginComponent},
     {
          path: '',
          component: PagesComponent,
          canActivate: [LoginGuardGuard],
          loadChildren: './pages/pages.module#PagesModule'
     },
     {path: '**', component: NopagefoundComponent}
];

export const APP_ROUTES = RouterModule.forRoot(appRoutes, { useHash: true});
