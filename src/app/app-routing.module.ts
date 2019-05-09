import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PersonaComponent } from './components/persona/persona.component';
import { ProductoComponent } from './components/producto/producto.component';
import { PersonaEdicionComponent } from './components/persona/persona-edicion/persona-edicion.component';
import { ProductoEdicionComponent } from './components/producto/producto-edicion/producto-edicion.component';

const routes: Routes = [
  {path: 'persona', component: PersonaComponent, children: [
    {path: 'nuevo', component: PersonaEdicionComponent},
    {path: 'edicion/:id', component: PersonaEdicionComponent}
  ] },
  {path: 'producto', component: ProductoComponent, children: [
  {path: 'nuevo', component: ProductoEdicionComponent},
    {path: 'edicion/:id', component: ProductoEdicionComponent}
  ]  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
