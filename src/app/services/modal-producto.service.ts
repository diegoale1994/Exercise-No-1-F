import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ModalProductoService {
  public modal = false;
  constructor() { }

  abrirModal() {
    this.modal = true;
  }

  cerrarModal() {
    this.modal = false;
}
}
