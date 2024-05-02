import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared/shared.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgSelectModule } from '@ng-select/ng-select';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { TokenAuthResponseInterceptor } from './interceptors/auth/token-auth-response.interceptor';
import { PipesModule } from './pipes/pipe/pipes.module';




@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,    
    RouterModule,
    SharedModule,
    AppRoutingModule,
    HttpClientModule,  
    NgSelectModule,
    PipesModule         
  ],
  providers: [
    {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true
  }
  ,
  {
    provide: HTTP_INTERCEPTORS,
    useClass: TokenAuthResponseInterceptor,
    multi: true
  }

],
  bootstrap: [AppComponent]
})
export class AppModule { }
