import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {InicioComponent} from "./components/inicio/inicio.component";
import {InfoComponent} from "./components/info/info.component";
import {ErrorComponent} from "./components/error/error.component";
import {InfoDetailComponent} from "./components/info-detail/info-detail.component";

const routes: Routes = [
  // PONER LAS RUTAS MAS USADAS EN LA PARTE DE ARRIBA
  {
    path: '',
    // CON EL FULL LEE TODA LA LINEA DEL URL
    pathMatch: "full",
    redirectTo: '/inicio'
  },
  {
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'info',
    component: InfoComponent
  },
  {
    // Vamos a trabajar con parametros
    /*
    En este caso solo trabajamos con un parametro pero podemos trabajar con mas
     */
    // Podemos trabajar tambien con querys
    path: 'info-detail/:id',
    component: InfoDetailComponent
  },
  {
    // Esta es la ruta error o cualquier ruta
    path: '**',
    component: ErrorComponent,
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
