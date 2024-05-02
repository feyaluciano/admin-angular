import { Component, OnInit, isDevMode } from '@angular/core';
import { AuthService } from 'src/app/modules/auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  public usuarioLogueado = '';
  constructor(public authService: AuthService) {}

  ngOnInit() {
    //this.usuarioLogueado = this.authService.getNombreYApellido();
  }

  ngAfterViewInit() {
    const script = document.createElement('script');
    script.src = './assets/js/custom-header.js';
    document.body.appendChild(script);
    // }
  }
}
