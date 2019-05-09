import { Component, OnInit } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ProductoService } from 'src/app/services/producto.service';
import { ModalProductoService } from 'src/app/services/modal-producto.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-producto',
  templateUrl: './producto.component.html',
  styleUrls: ['./producto.component.css']
})
export class ProductoComponent implements OnInit {
  productos: Producto[];
  productoSeleccionado: Producto;
  constructor(private productoService: ProductoService, private modalProductoService: ModalProductoService) { }

  ngOnInit() {
    this.productoService.mensajeCambio.subscribe(mensaje => {
      Swal.fire(
        'Nueva alerta',
        mensaje,
        'success'
      );
    });
    this.productoService.productoCambio.subscribe(productos => {
      this.productos = productos;
    });
    this.productoService.listar().subscribe(productos => {
      this.productos = productos;
    });
  }

  eliminar(producto: Producto) {

  }

  abrirModal(producto: Producto) {
    console.log(producto);
    this.productoSeleccionado = producto;
    this.modalProductoService.abrirModal();
  }

  abrirModalNuevoProducto() {
    this.productoSeleccionado = new Producto();
    this.productoSeleccionado.idProducto = 0;
    this.modalProductoService.abrirModal();
  }

}
