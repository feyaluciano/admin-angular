import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-modal-alert',
  templateUrl: './modal-alert.component.html',
  styleUrls: ['./modal-alert.component.css']
})
export class ModalAlertComponent implements OnInit {

  @Input() cuerpoMensaje:String | undefined;

  constructor(public modal: NgbActiveModal) { }

  ngOnInit(): void {   
  }

}
