import { Component, OnInit, inject, signal } from '@angular/core';
import { PanelService } from '../../services/panel.service';
import * as signalR from '@microsoft/signalr';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrls: ['./panel.component.css']
})
export class PanelComponent implements OnInit {
  public cargandoListado:boolean = false;    
  api_url:String=environment.apiEndPoint;  
  constructor(private panelService:PanelService ) {

   }
  ngOnInit() {        
  }

}
