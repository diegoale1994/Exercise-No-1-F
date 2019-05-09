import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { PersonaService } from 'src/app/services/persona.service';
import { Persona } from 'src/app/models/persona';

@Component({
  selector: 'app-persona-edicion',
  templateUrl: './persona-edicion.component.html',
  styleUrls: ['./persona-edicion.component.css']
})
export class PersonaEdicionComponent implements OnInit {
  form: FormGroup;
  idPersona: number;
  constructor(private activatedRoute: ActivatedRoute, private personaService: PersonaService, private router: Router) {}

  ngOnInit() {
    this.form = new FormGroup({
      id: new FormControl(0, Validators.required),
      nombres: new FormControl('', Validators.required),
      apellidos: new FormControl('', Validators.required)
    });

    this.activatedRoute.params.subscribe((params: Params) => {
      if (params.id) {
        this.idPersona = params.id;
        this.initForm();
      }
    });
  }
  initForm() {
   if (this.idPersona !== null && this.idPersona > 0) {
      this.personaService.buscarPorId(this.idPersona).subscribe(persona => {
        this.form = new FormGroup({
          id: new FormControl(persona.idPersona, Validators.required),
          nombres: new FormControl(persona.nombres, Validators.required),
          apellidos: new FormControl(persona.apellidos, Validators.required)
        });
      });
   }
  }

  operar() {

    const persona = new Persona();
    persona.idPersona = this.form.value.id;
    persona.nombres = this.form.value.nombres;
    persona.apellidos = this.form.value.apellidos;
    if (this.form.value.id === 0) {
      this.personaService.registrar(persona).subscribe(() => {
        this.personaService.listar().subscribe(personas => {
          this.personaService.personaCambio.next(personas);
          this.personaService.mensajeCambio.next('Persona Registrado con exito');
        });
      });
    } else {
      this.personaService.actualizar(persona).subscribe(() => {
        this.personaService.listar().subscribe(personas => {
          this.personaService.personaCambio.next(personas);
          this.personaService.mensajeCambio.next('Paciente Actualizado con exito');
        });
      });
    }
    this.router.navigate(['/persona']);

  }
}
