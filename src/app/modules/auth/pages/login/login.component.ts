import { Component, OnInit } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  mostrarMensajeError: boolean = false;
  usuarioEstaLogueado: boolean = false;
  mensajeAlIngresarORegistrar: String = 'add';
  mostrarCargando: boolean = false;
  public loginFormulario: UntypedFormGroup = this._builder.group({
    password: ['', [Validators.required]],
    email: ['', [Validators.required, Validators.email]],
  });

  constructor(
    private _builder: UntypedFormBuilder,
    private router: Router,
    private _authService: AuthService
  ) {
    //12345678A
    this.loginFormulario = this._builder.group({
      password: ['', [Validators.required]],
      email: ['admin@gmail.com', [Validators.required, Validators.email]],
    });
  }

  login() {
    this.mostrarMensajeError = false;
    if (this.loginFormulario.valid) {
      this.mostrarCargando = true;
      const email = this.loginFormulario.get('email')!.value;
      const password = this.loginFormulario.get('password')!.value;
      this.router.navigate(['panel/start']);
    } else {
      this.mostrarMensajeError = true;
      this.loginFormulario.markAllAsTouched();
    }
  }
  ngOnInit() {}
}
