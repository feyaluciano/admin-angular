import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PanelComponent } from './pages/panel/panel.component';

const routes:Routes=[      
  {path : '' , redirectTo : '/panel/start' , pathMatch : 'full'},
  {
    path:'',
    children: [      
      { path: 'start', component: PanelComponent },          
    ]   
  },
  {
    path: 'panel',
    loadChildren: () => import('../panel-admin/panel-admin.module').then(
      m => m.PanelAdminModule
      ),    
  }  
  ]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PanelAdminRoutingModule { }
