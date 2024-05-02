import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from 'src/app/modules/auth/services/auth.service';


@Component({
  selector: 'app-modal-expired-token',
  templateUrl: './modal-expired-token.component.html',
  styleUrls: ['./modal-expired-token.component.css']
})
export class ModalExpiredTokenComponent implements OnInit {
  private _router:Router
  public _modal: NgbActiveModal;
  countdown: number = 60; // Inicializar con el tiempo en segundos
  countdownInterval: any;
  @Input() entidad?: string;
  @Input() accion?: string;
  constructor(public modal: NgbActiveModal,public router:Router ) {
    this._router=router;
    this._modal=modal;
  }
  
  ngOnInit(): void {
    this.startCountdown();
  }


  redirectToLogin() {    
    this.router.navigate(['/auth/login']);
    this._modal.dismiss(); // Cerrar el modal
  }

  closeModal() {
    clearInterval(this.countdownInterval);
    this._modal.dismiss();
  }

  startCountdown() {
    this.countdownInterval = setInterval(() => {
      this.countdown--;

      if (this.countdown <= 0) {
        clearInterval(this.countdownInterval);
        this.redirectToLogin();
      }
    }, 1000);
  }

}
