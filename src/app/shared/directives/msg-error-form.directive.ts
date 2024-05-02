import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appMsgErrorForm]'
})
export class MsgErrorFormDirective {  
  htmlElement:ElementRef<HTMLElement>;
  public _colorText:string="red";
  private _mensajeError:string='Este campo es requerido';
  
  //@Input() colorText:string='red';
  @Input() set colorText(valor:string){      
    this._colorText=valor; 
    this.htmlElement.nativeElement.style.color=valor;            
  }
  
  //@Input() mensajeError:string;
  @Input() set mensajeError(valor:string){ 
    this._mensajeError=valor;   
    this.htmlElement.nativeElement.innerText=valor;    
  }


  @Input() set valido(valor:boolean){ 
    if (valor===true){
      this.htmlElement.nativeElement.style.display='';
    }
    else {
      this.htmlElement.nativeElement.style.display='none';
    }
  }
  

  constructor(private el:ElementRef<HTMLElement>) {
    this.htmlElement=el;
   }

  ngOnInit(){
    this.setColor();
    this.setMensaje();
  }
  

  setMensaje():void{
    this.htmlElement.nativeElement.innerHTML=this._mensajeError;
  }

  setColor():void{    
    this.htmlElement.nativeElement.style.color=this._colorText;    
  }

}