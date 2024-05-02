import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../modules/auth/services/auth.service';
import { ModalExpiredTokenComponent } from '../shared/components/modal-expired-token/modal-expired-token.component';
import { AuthenticateResponse } from '../interfaces/authenticate-response';


@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(
    private router: Router,
    private modalService: NgbModal,
    private authService: AuthService,    
  ) {}

  handle401Error(currentUrl:string) {              
    const modalRef = this.modalService.open(ModalExpiredTokenComponent, {
      windowClass: 'animate__animated animate__bounceInDown',
    });
   
    modalRef.result
      .then((ok) => {
        
        if (ok) {                   
          this.authService.refreshTokenApi().subscribe(
            (res) => {             
              let tokenApi: AuthenticateResponse = res;
              this.authService.saveToken(tokenApi.jwtToken!);
              this.authService.saveRefreshToken(tokenApi.refreshToken!);                            
              this.router.navigateByUrl('/', { skipLocationChange: true })
              .then(
                //() => this.router.navigate([currentUrl])
              );              
            },
            (error) => {                       
              this.router.navigate(['/auth/login']);
            }
          );
        } else {
          this.router.navigate(['/auth/login']);
        }
      })
      .finally(() => {
        this.router.navigate([currentUrl]);

      })
      .catch((resu) => {});      
  }

}
