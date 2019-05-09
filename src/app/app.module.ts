import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/inc/navbar/navbar.component';
import { FooterComponent } from './components/inc/footer/footer.component';
import { PersonaComponent } from './components/persona/persona.component';
import { ProductoComponent } from './components/producto/producto.component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HttpClientModule } from '@angular/common/http';
import { PersonaEdicionComponent } from './components/persona/persona-edicion/persona-edicion.component';
import { ProductoEdicionComponent } from './components/producto/producto-edicion/producto-edicion.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    PersonaComponent,
    ProductoComponent,
    PersonaEdicionComponent,
    ProductoEdicionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    SweetAlert2Module.forRoot(),
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
