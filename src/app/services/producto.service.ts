import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Subject, Observable } from 'rxjs';
import { Producto } from '../models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private url = `${environment.URL_HOST}/productos`;
  public productoCambio = new Subject<Producto[]>();
  public mensajeCambio = new Subject<string>();

  constructor(private http: HttpClient) { }

  listar(): Observable<Producto[]>  {
    return this.http.get<Producto[]>(this.url);
  }

  buscarPorId(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${this.url}/${id}`);
  }

  registrar(producto: Producto) {
    return this.http.post(this.url, producto);
  }

  actualizar(producto: Producto) {
    return this.http.put(this.url, producto);
  }

  eliminar(idProducto: number) {
    return this.http.delete(`${this.url}/${idProducto}`);
  }
}
