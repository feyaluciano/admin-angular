import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PersonaEditComponent } from './pages/persona-edit/persona-edit.component';
import { PersonaListComponent } from './pages/persona-list/persona-list.component';

const routes:Routes=[      
  {path : '' , redirectTo : '/persona/lista' , pathMatch : 'full'},
  {
    path:'',
    children: [       
      { path: 'lista', component: PersonaListComponent },
      { path: 'edit/:idPersona', component: PersonaEditComponent },
      { path: 'new', component: PersonaEditComponent }                       
    ]   
  },
  {
    
    path: 'persona',
    loadChildren: () => import('../persona/persona.module').then(
      m => m.PersonaModule
      ),    
  }  
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PersonaRoutingModule { }
