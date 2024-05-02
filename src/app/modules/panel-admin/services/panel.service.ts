import { Injectable, signal } from '@angular/core';
import { delay, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PanelService {

  api_url:String=environment.apiEndPoint;
  
  constructor(private _http:HttpClient) { }
   
}
