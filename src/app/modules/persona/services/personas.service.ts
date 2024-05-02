import { Injectable, signal } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ResponseEntity } from 'src/app/interfaces/response-entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Persona } from 'src/app/interfaces/persona';



@Injectable({
  providedIn: 'root'
})
export class PersonasService {
api_url:String=environment.apiEndPoint;
public listado = signal<Persona[]>([]);
constructor(private _http:HttpClient) { }


guardarEntidad(Persona: Persona): Observable<any> {      
  if (Persona.id == 0) {    
    return this._http.post<any>(
      `${this.api_url}/v1/Personas/CreatePersona`,
      Persona,
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
    );
  } else {
    return this._http.put<Persona>(
      `${this.api_url}/v1/Personas/UpdatePersona`,
      Persona,
      { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
    );
  }
}



getListado(): Observable<ResponseEntity<Persona[]>> {  
  let obs: Observable<ResponseEntity<Persona[]>> = this._http.get<ResponseEntity<Persona[]>>(    
    `${this.api_url}/v1/Personas/GetPersonas`,
    {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }
  );
  return obs.pipe(
    delay(1000) 
  );
}


getPorId(Id: number): Observable<ResponseEntity<Persona>> {  
  let obs: Observable<ResponseEntity<Persona>> = this._http.get<ResponseEntity<Persona>>(
    this.api_url +
      `/v1/Personas/GetPersonaById/${Id}`,
    {
      headers: {},
    }
  );
  return obs;
}



eliminarSeleccionados(seleccion:Number[]): Observable<any[]> {
  var cadena=seleccion.join(',');
  var personasMUltiple={"ids":cadena}
  let obs: Observable<Number[]> = this._http.patch<Number[]>(
  this.api_url +`/v1/Personas/DeleteMultiple`,
  personasMUltiple,    
 {
   headers: {  
     'Content-Type': 'application/json; charset=UTF-8',     
   },
 }
);
return obs;
}



buscar(apellido: string): Observable<Persona[]> {
  let obs: Observable<any> = this._http.get<any[]>(    
    `${this.api_url}/v1/Personas/SearchPersonas?apellidoPersona=` +
    apellido,
    {
      headers: {
        'Content-Type': 'application/json; charset=UTF-8',
      },
    }
  );
  return obs;
}
}



