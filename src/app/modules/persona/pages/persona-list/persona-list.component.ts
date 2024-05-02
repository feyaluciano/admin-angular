import { Component, effect, inject, OnInit, signal } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Persona } from 'src/app/interfaces/persona';
import { ModalConfirmComponent } from 'src/app/shared/components/modal-confirm/modal-confirm.component';
import { PersonasService } from '../../services/personas.service';
import { ResponseEntity } from 'src/app/interfaces/response-entity';

@Component({
  selector: 'app-persona-list',
  templateUrl: './persona-list.component.html',
  styleUrls: ['./persona-list.component.css'],
})
export class PersonaListComponent implements OnInit {
  public nombreEntidad: String = 'Persona';
  public nombreEntidadPlural: String = 'Personas ';
  public totalEntidades: number = 0;
  public cargandoListado: boolean = false;
  
  p: number = 1; //paginación
  public formBuscar: UntypedFormGroup;
  private modalService = inject(NgbModal);
  public _personasService = inject(PersonasService);
  private _builder = inject(UntypedFormBuilder);

  constructor() {
    this.formBuscar = this._builder.group({
      CampoBuscar: ['', [Validators.required, Validators.minLength(4)]],
    });

    effect(() => {
      this.totalEntidades = this._personasService.listado().length;
    });
  }

  abrirModalConfirm(accion: string) {
    switch (accion) {
      case 'eliminar': {
        if (this.generateIdsChecked().length > 0) {
          const modalRef = this.modalService.open(ModalConfirmComponent, {
            windowClass: 'animate__animated animate__bounceInDown',
          });
          modalRef.componentInstance.entidad = 'Persona';
          modalRef.componentInstance.accion = 'eliminar';
          modalRef.result
            .then((ok) => {
              if (ok == 1) {
                this.eliminarSeleccionados();
              }
            })
            .finally(() => {})
            .catch((resu) => {});
        }
        break;
      }

      default: {
        break;
      }
    }
  }

  cargarListado() {
    this.cargandoListado = true;
    const miObserver = {
      next: (datos: ResponseEntity<Persona[]>) => {
        console.log('Datos recibidos: ' + datos);
        this._personasService.listado.set(JSON.parse(JSON.stringify(datos.result)));
      },
      error: (err: any) => console.error('Error: ' + err),
      complete: () => {
        this.cargandoListado = false;
      },
    };
    this._personasService.getListado().subscribe(miObserver);
  }

  ngOnInit() {
    this.cargarListado();
  }

  //---------------------------------------------------- Eliminar entidad-----------------------------------

  eliminarSeleccionados() {
    const miObserver = {
      next: (data: any) => console.log('Datos recibidos: ' + data),
      error: (err: any) => console.error('Error: ' + err),
      complete: () => this.cargarListado(),
    };
    return this._personasService
      .eliminarSeleccionados(this.generateIdsChecked())
      .subscribe(miObserver);
  }

  generateIdsChecked(): Number[] {
    let checkeados: Number[] = [];
    for (let j = 0; j < this._personasService.listado().length; j++) {
      if (this._personasService.listado()[j].Checked) {
        checkeados.push(this._personasService.listado()[j].id);
      }
    }
    return checkeados;
  }

  arrayChecked(idPersona: number) {
    let entidad = this._personasService.listado().find((x) => x.id == idPersona);
    if (entidad!.Checked) {
      entidad!.Checked = false;
    } else {
      entidad!.Checked = true;
    }
  }
  //---------------------------------------------------- Eliminar entidad-----------------------------------

  //---------------------------------INICIO BUSQUEDA SIMPLE-------------------------------------------------------

  buscar() {
    this.cargandoListado = true;
    const miObserver = {
      next: (response: any) => {
        console.log('Datos encontrados: ' + response.data);
        this._personasService.listado.set(JSON.parse(JSON.stringify(response.result)));
        this.cargandoListado = false;
      },
      error: (err: any) => console.error('Error: ' + err),
      complete: () => {},
    };
    return this._personasService
      .buscar(this.formBuscar.get('CampoBuscar')!.value)
      .subscribe(miObserver);
  }

  cancelar() {
    this.cargarListado();
  }
  //---------------------------------FIN BUSQUEDA SIMPLE-------------------------------------------------------
}
