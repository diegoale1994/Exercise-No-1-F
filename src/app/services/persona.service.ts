import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, Subject } from 'rxjs';
import { Persona } from '../models/persona';
@Injectable({
  providedIn: 'root'
})
export class PersonaService {
  private url = `${environment.URL_HOST}/personas`;
  public personaCambio = new Subject<Persona[]>();
  public mensajeCambio = new Subject<string>();
  constructor(private http: HttpClient) { }

  listar(): Observable<Persona[]>  {
    return this.http.get<Persona[]>(this.url);
  }

  buscarPorId(id: number): Observable<Persona> {
    return this.http.get<Persona>(`${this.url}/${id}`);
  }

  registrar(persona: Persona) {
    return this.http.post(this.url, persona);
  }

  actualizar(persona: Persona) {
    return this.http.put(this.url, persona);
  }

  eliminar(idPersona: number) {
    return this.http.delete(`${this.url}/${idPersona}`);
  }
}
