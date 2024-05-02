import { Component, OnInit } from '@angular/core';
import {
  UntypedFormGroup,
  UntypedFormBuilder,
  Validators,
} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Location } from '@angular/common';

import { ModalAlertComponent } from 'src/app/shared/components/modal-alert/modal-alert.component';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { Provincia } from 'src/app/interfaces/provincia';
import { ProvinciasService } from '../../services/provincias.service';
import { Persona } from 'src/app/interfaces/persona';
import { ResponseEntity } from 'src/app/interfaces/response-entity';
import { PersonasService } from '../../services/personas.service';


@Component({
  selector: 'app-persona-edit',
  templateUrl: './persona-edit.component.html',
  styleUrls: ['./persona-edit.component.css'],
})
export class PersonaEditComponent implements OnInit {
  public nombreEntidad = 'Persona';
  public formEntidad: UntypedFormGroup;
  public Entidad: Persona | undefined;
  public editando: boolean = false;
  public mostrarCargando: boolean = false;
  public enviandoPersona: boolean = false;
  public mensajeAlerta = '';
  public selectedItemsPersonas: Persona[] = [];
  public listadoProvincias:Provincia[]=[]    

  constructor(
    private location: Location,
    private _personasService: PersonasService,
    private _provinciasService: ProvinciasService,
    private _builder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private _modalService: NgbModal,    
    private _authService: AuthService
  ) {
    this.formEntidad = this._builder.group({            
      nombre: ['', [Validators.required, Validators.pattern(/^[\w ]{1,20}$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[\w ]{1,20}$/)]],
      dni: ['', [Validators.required, Validators.pattern(/^[0-9]{7,8}$/)]],     
      telefono: ['', [Validators.required,Validators.pattern(/^\d{10,13}$/)]],
      provincia: ['', [Validators.required]],          
    });    
  }

  //-----------------------------------------------------------INICIO GUARDAR----------------------------------------------------------------------------

  displayFormErrors() {
    Object.keys(this.formEntidad.controls).forEach((controlName) => {
      const controlErrors = this.formEntidad.get(controlName)!.errors;
      if (controlErrors != null) {
        Object.keys(controlErrors).forEach((errorKey) => {
          console.error(
            `Control: ${controlName}, Error: ${errorKey}, Value: ${controlErrors[errorKey]}`
          );
        });
      }
    });
  }


  private actualizarEntidad(entidadActualiazada: Persona) {       
    entidadActualiazada.nombre = this.formEntidad.get('nombre')!.value || '';
    entidadActualiazada.apellido = this.formEntidad.get('apellido')!.value || '';
    entidadActualiazada.telefono = this.formEntidad.get('telefono')!.value || '';
    entidadActualiazada.dni = this.formEntidad.get('dni')!.value || null;
    var provincia=this.formEntidad.get('provincia')!.value; 
    entidadActualiazada.provincia=provincia;    
    entidadActualiazada.provinciaId=provincia.id;  
    return entidadActualiazada;
  }

  guardarEntidad() {    
    var entidadAEnviar: Persona;
    this.enviandoPersona=true;       
    if (this.formEntidad.valid) {           
      var entidadActualiazada: Persona;
      entidadActualiazada = { id: 0};            
      if (this.Entidad) {        
        if (this.Entidad && this.editando) {                      
          entidadActualiazada.id=this.route.snapshot.params['idPersona'];                               
          entidadAEnviar = this.actualizarEntidad(entidadActualiazada);          
          this.mensajeAlerta = 'Actualización del Persona:';          
        } else {          
          var entidadActualiazada: Persona = { id: 0 };                             
          entidadAEnviar = this.actualizarEntidad(entidadActualiazada);
          this.mensajeAlerta = 'Creacion del Persona:';
        }
        const miObserver = {
          next: (data:any) => {            
            if (data.isSuccess) {              
              this.mensajeAlerta +="OK";
            } else {
              this.mensajeAlerta +="Error";
            }  
            this.enviandoPersona=false;          
          },
          error: (err: any) => {
            this.enviandoPersona=false;            
            const modalRef = this._modalService.open(ModalAlertComponent);
            modalRef.componentInstance.cuerpoMensaje ='Error al guardar la entidad:Verifique si la persona ya existe';
          },
          complete: () => {
            const modalRef = this._modalService.open(ModalAlertComponent);
            modalRef.componentInstance.cuerpoMensaje = this.mensajeAlerta;
            this.enviandoPersona=false;
            this.router.navigate(['/persona/lista']);
          },
        };        
        this._personasService
          .guardarEntidad(entidadAEnviar!)
          .subscribe(miObserver);
      } 
    }
    else {
      this.displayFormErrors();
      this.enviandoPersona=false;
      this.formEntidad.markAllAsTouched();
    }   
  }

  

  asignarValoresAForm(Entidad: Persona) {             
    this.formEntidad.patchValue({      
      nombre: Entidad.nombre || '',
      apellido: Entidad.apellido || '',
      dni: Entidad.dni || null,
      telefono: Entidad.telefono || null,              
      provincia: Entidad.provincia || '',          
      fechaAlta: new Date(Entidad.fechaAlta!).toISOString().substring(0, 10) || null      
    });    
  }

  configPersona(persona: Persona) {    
    this.Entidad = persona; //     //this.formEntidad.patchValue(this.Entidad);
    this.asignarValoresAForm(this.Entidad);
  }
 
  ngOnInit() {
    this.mostrarCargando = true;    
    this.formEntidad.disable();    
      this.mostrarCargando = false;
      this.formEntidad.enable();
      //El dni no se puede editar
      if (this.editando) {
        this.formEntidad.get('numeroDocumento')?.disable();
      }
    
      
    if (typeof this.route.snapshot.params['idPersona'] !== 'undefined') {      
      this.editando = true;
      const miObserver = {
        next: (data: ResponseEntity<Persona>) => {  
          this.configPersona(data.result!);
        },
        error: (err: any) => console.error('Error: ' + err),
        complete: () => {},
      };
      this._personasService
        .getPorId(this.route.snapshot.params['idPersona'])
        .subscribe(miObserver);
    } else {
      this.formEntidad.enable();
      this.mostrarCargando = false;
      this.editando = false;
      this.Entidad = { id: 0 };
    }
    this.cargarProvincias();
  }

  //------------------------------------------------funciones secundarioas----------------------------------------------------------



  cargarProvincias(){
    const miObserver = {
      next: (datos: ResponseEntity<Provincia[]>) => {                 
        console.log('Datos recibidos: ' + datos)
        this.listadoProvincias = datos.result!;                       
      },
      error: (err: any) => console.error('Error: ' + err),
      complete: () => {
        let indice=0;
        if (this.editando) {         
        indice = this.listadoProvincias.findIndex((provincia) => {
          return provincia.id === this.Entidad!.provincia!.id;
        });
      }
      let provincia=this.listadoProvincias[indice];       
        this.formEntidad
          .get('provincia')!
          .setValue(provincia);
      }
    };
    this._provinciasService.getListado().subscribe(miObserver);
  }



  cargarPersona() {
    return this._personasService.getPorId(
      this.route.snapshot.params['idPersona']
    );
  }

  

  tieneErrorCampoFormulario(campo: string, tipo: string) {
    return (
      this.formEntidad.get(campo)!.hasError(tipo) &&
      this.formEntidad.get(campo)!.touched
    );
  }

  volverAtras(event: Event) {
    event.preventDefault();
    this.location.back();
  }
  //------------------------------------------------fin funciones secundarioas----------------------------------------------------------
}
