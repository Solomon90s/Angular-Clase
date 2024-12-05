import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InicioComponent } from "./components/inicio/inicio.component";
import { Ruta1Component } from "./components/ruta1/ruta1.component";


const routes: Routes = [
  {
    // Ruta vacia
    path: '',
    // posibilidad de redirigir
    redirectTo: 'inicio',
    // Obliga a que la ruta conincida exactamente con el path
    pathMatch: 'full'
  },{
    path: 'inicio',
    component: InicioComponent
  },
  {
    path: 'ruta1',
    component: Ruta1Component
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
