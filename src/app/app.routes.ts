import { Routes } from '@angular/router';
import {HomeComponent} from './componentes/home/home.component';
import {ServicioListarComponent} from './componentes/servicio-listar/servicio-listar.component';
import {ServicioRegistrarComponent} from './componentes/servicio-registrar/servicio-registrar.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'listar-servicios', component: ServicioListarComponent },
  { path: 'registrar-servicio', component: ServicioRegistrarComponent },
];
