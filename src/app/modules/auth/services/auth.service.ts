import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, first, map } from 'rxjs/operators';
import { ActualizarPassword } from 'src/app/interfaces/actualizar-password';
import { AuthenticateResponse } from 'src/app/interfaces/authenticate-response';
import { TokenUser } from 'src/app/interfaces/token-user';

import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root'
})
export class AuthService {

  api_url:String=environment.apiEndPoint;

  constructor(private _http:HttpClient) { }

  login(email:string,password:string):Observable<AuthenticateResponse>{        
    var headers={     
    }
    let obs=this._http.post<any>(`${this.api_url}/login`,{
      email,password,headers     
    })  
        return obs;
    }


    refreshTokenApi():Observable<AuthenticateResponse>{        
      var RefreshToken=this.getRefreshToken();
      var IpAddress="";      
      var headers={     
      }
      let obs=this._http.post<any>(`${this.api_url}/refresh-token`,{
        RefreshToken,IpAddress,headers     
      })  
          return obs;
      }

      actualizarPassword(actualizarPasswordRequest:ActualizarPassword):Observable<ActualizarPassword>{
        return this._http.post<ActualizarPassword>(
          `${this.api_url}/actualizar-pass`,
          actualizarPasswordRequest,
          { headers: { 'Content-Type': 'application/json; charset=UTF-8' } }
        );                
      }


    saveToken(token: string) {
      localStorage.setItem('token', token);
    }

    saveIdUsuario(id: string) {      
      localStorage.setItem('idUsuario', id);
    }

    getIdUsuario() {
      return localStorage.getItem('idUsuario');
    }

    saveRefreshToken(refreshToken: string) {
      localStorage.setItem('refreshToken', refreshToken);
    }
  
    getToken(): any {    
      return localStorage!.getItem('token');
    }

    getRefreshToken(): any {    
      return localStorage!.getItem('refreshToken');
    }
  
    removeToken() {
      localStorage.removeItem('token');
    }

    removeRefreshToken() {
      localStorage.removeItem('refreshToken');
    }
  
    isLoggedIn(): boolean {
      return !!this.getToken();
    }

    getProfile(): string {
      const token = this.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.perfil; 
      }
      return "";
    }

    getNombreYApellido(): string {
      const token = this.getToken();
      if (token) {
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.unique_name; 
      }
      return "";
    }


}
