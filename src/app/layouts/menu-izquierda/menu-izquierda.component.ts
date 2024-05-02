import { Component,Signal, effect, inject, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';
import { PersonasService } from 'src/app/modules/persona/services/personas.service';


interface MenuItem{
  texto:String;
  ruta:string;
  icono:string;  
};
@Component({
  selector: 'app-menu-izquierda',
  templateUrl: './menu-izquierda.component.html',
  styleUrls: ['./menu-izquierda.component.css']
})
export class MenuIzquierdaComponent implements OnInit {

  public templateMenu:MenuItem[]=[
    {
      texto:'Áreas',
      ruta:'/areas/lista',
      icono:'./assets/img/menu-icon/11.svg',        
    },
    {
      texto:'Motivos Originantes',
      ruta:'/tipo-motivo-originante/lista',
      icono:'./assets/img/menu-icon/12.svg',      
    }];
  
 
  public totalEntidades:number=0;
  public isAdmin: boolean=true;
  public _personasService = inject(PersonasService);
  constructor(private authService: AuthService) { 
    effect(()=> this.totalEntidades = this._personasService.listado().length);   
  }

  

  ngOnInit() {   
  }

}
