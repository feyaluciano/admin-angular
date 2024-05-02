/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { LoginComponent } from './login.component';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { ReactiveFormsModule, UntypedFormBuilder } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { of } from 'rxjs';

class RouterStub {
  navigate(url: string) {
    return url;
  }
}

class ActivatedRouteStub {
  // Puedes agregar propiedades y métodos necesarios para tus pruebas aquí
  // Por ejemplo:
  snapshot = { paramMap: new Map([['id', 'valor']]) };
}

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authServiceSpy: jasmine.SpyObj<AuthService>;
  let router: Router;

  
  beforeEach((() => {

    authServiceSpy = jasmine.createSpyObj('AuthService', ['login', 'saveToken']);

    TestBed.configureTestingModule({
      declarations: [ LoginComponent ],
      providers:[
       // ActivatedRoute,
       { provide: ActivatedRoute, useClass: ActivatedRouteStub },
        UntypedFormBuilder,
        { provide: Router, useClass: RouterStub },
        { provide: AuthService, useValue: authServiceSpy },
        ],
         imports:[
          RouterModule,HttpClientModule,ReactiveFormsModule
        ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authServiceSpy.saveToken.and.stub(); 
    fixture.detectChanges();

  }));

  

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should set mostrarMensajeError to true on invalid form submission', () => {
    // Simula el llenado del formulario con datos incorrectos
    component.loginFormulario.setValue({
      email: '',
      password: '',
    });
    component.login();
    expect(component.mostrarMensajeError).toBeTrue();
  });


  it('should call login() on valid form submission', fakeAsync(() => {
    authServiceSpy.login.and.returnValue(of({ token: 'fakeToken' }));

    // Simula el llenado del formulario
    component.loginFormulario.setValue({
      email: 'test@example.com',
      password: 'password',
    });


    component.login();

    // Espera a que se resuelva la promesa del observable
    tick();

    expect(authServiceSpy.login).toHaveBeenCalledWith(
      'test@example.com',
      'password'
    );
    expect(component.mostrarMensajeError).toBeFalse();
    //expect(router.navigate).toHaveBeenCalledWith(['panel/start']);

  }));

});
