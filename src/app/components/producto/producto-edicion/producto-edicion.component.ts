import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { Producto } from 'src/app/models/producto';
import { ModalProductoService } from 'src/app/services/modal-producto.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ProductoService } from 'src/app/services/producto.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-producto-edicion',
  templateUrl: './producto-edicion.component.html',
  styleUrls: ['./producto-edicion.component.css']
})
export class ProductoEdicionComponent implements OnInit {
  private _producto: Producto;
  form: FormGroup;
  constructor(public modalProductoService: ModalProductoService, private productoService: ProductoService,  private router: Router) { }

  ngOnInit() {
  }

  initForm() {
    this.form = new FormGroup({
      id: new FormControl(this._producto.idProducto, Validators.required),
      nombre: new FormControl(this._producto.nombre, Validators.required),
      marca: new FormControl(this._producto.marca, [Validators.required, Validators.min(3)]),
      precio: new FormControl(this._producto.precio, Validators.required)
    });
  }

  @Input()
  set producto(producto: Producto) {
    console.log(producto);
    this._producto = producto;
    this.initForm();
}

  cerrarModal() {
    this.modalProductoService.cerrarModal();
  }
  operar() {
    const productoNuevo = new Producto();
    productoNuevo.idProducto = this.form.value.id;
    productoNuevo.nombre = this.form.value.nombre;
    productoNuevo.marca = this.form.value.marca;
    productoNuevo.precio = this.form.value.precio;
    if (this.form.value.id === 0) {
      this.productoService.registrar(productoNuevo).subscribe(() => {
        this.productoService.listar().subscribe(productos => {
          this.productoService.productoCambio.next(productos);
          this.productoService.mensajeCambio.next('Producto Registrado con exito');
        });
      });
    } else {
      this.productoService.actualizar(productoNuevo).subscribe(() => {
        this.productoService.listar().subscribe(productos => {
          this.productoService.productoCambio.next(productos);
          this.productoService.mensajeCambio.next('Producto Actualizado con exito');
        });
      });
    }
    this.modalProductoService.cerrarModal();
    this.router.navigate(['/producto']);
  }

}
