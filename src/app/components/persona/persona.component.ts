import { Component, OnInit } from '@angular/core';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-persona',
  templateUrl: './persona.component.html',
  styleUrls: ['./persona.component.css']
})
export class PersonaComponent implements OnInit {
  constructor(private personaService: PersonaService) { }
  personas: Persona[];
  ngOnInit() {

    this.personaService.personaCambio.subscribe(personas => {
      this.personas = personas;
    });

    this.personaService.mensajeCambio.subscribe(mensaje => {
      Swal.fire(
        'Nueva alerta',
        mensaje,
        'success'
      );
    });

    this.personaService.listar().subscribe(personas => {
     this.personas = personas;
    });
  }

  eliminar(persona: Persona) {
   this.personaService.eliminar(persona.idPersona).subscribe(() => {
    this.personaService.listar().subscribe(personas => {
      this.personaService.personaCambio.next(personas);
      this.personaService.mensajeCambio.next('Persona eliminada con exito');
    });
   });
  }

}
