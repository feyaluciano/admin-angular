import { Injectable, signal } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { ResponseEntity } from 'src/app/interfaces/response-entity';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Provincia } from 'src/app/interfaces/provincia';



@Injectable({
  providedIn: 'root'
})
export class ProvinciasService {
api_url:String=environment.apiEndPoint;
public listado = signal<Provincia[]>([]);
constructor(private _http:HttpClient) { }


getListado(): Observable<ResponseEntity<Provincia[]>> {  
  let obs: Observable<ResponseEntity<Provincia[]>> = this._http.get<ResponseEntity<Provincia[]>>(    
    `${this.api_url}/v1/Provincia/GetProvincias`,
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

}



