import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

const routes:Routes=[  
  //CUANDO INGRESO A misutio.com.ar/ redirige a /auth/login  POR LO TANTO CARGA EL MODULO auth (ver este modulo y su routing)
  {path : '' , redirectTo : '/auth/login' , pathMatch : 'full'},  // CON pathMatch : 'full' LE INDICO QUE LA RUTA TIENE QUE COINICIDIR COMPLETAMENTE EN ESTE CASO "'/auth/login'" OSEA, SI PONE '/auth/lo' POR EJEMPLO NO FUNCIONARIA
  
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module').then(
      m => m.AuthModule
      ),    
  },
    
  {
    path: 'panel',
    loadChildren: () => import('./modules/panel-admin/panel-admin.module').then(
      m => m.PanelAdminModule
      ),    
  },  
  
 
  {
    path: 'persona',
    loadChildren: () => import('./modules/persona/persona.module').then(
      m => m.PersonaModule
      ),    
  }
  ,
  
  
]

@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes,{ useHash: true })],
  exports: [RouterModule],
  providers: [    
    { provide: LocationStrategy, useClass: HashLocationStrategy },   
  ],
})
export class AppRoutingModule { }
