import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { MenuIzquierdaComponent } from 'src/app/layouts/menu-izquierda/menu-izquierda.component';
import { FooterComponent } from 'src/app/layouts/footer/footer.component';
import { ModalConfirmComponent } from '../components/modal-confirm/modal-confirm.component';
import { RouterModule } from '@angular/router';
import { DateTimeInfoComponent } from '../components/date-time-info/date-time-info.component';
import { ModalAlertComponent } from '../components/modal-alert/modal-alert.component';
import { MsgErrorFormDirective } from '../directives/msg-error-form.directive';
import { ModalExpiredTokenComponent } from '../components/modal-expired-token/modal-expired-token.component';



@NgModule({
  imports: [
    CommonModule,
    RouterModule,
  ],
  declarations: [HeaderComponent,MenuIzquierdaComponent,FooterComponent,ModalConfirmComponent,DateTimeInfoComponent,ModalAlertComponent,MsgErrorFormDirective,
    ModalExpiredTokenComponent
  ],
  exports:[HeaderComponent,MenuIzquierdaComponent,FooterComponent,ModalConfirmComponent,DateTimeInfoComponent,ModalAlertComponent,MsgErrorFormDirective,ModalExpiredTokenComponent],  
})
export class SharedModule { }
