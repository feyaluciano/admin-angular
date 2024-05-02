import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PanelAdminRoutingModule } from './panel-admin-routing.module';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { PanelComponent } from './pages/panel/panel.component';
import { PipesModule } from 'src/app/pipes/pipe/pipes.module';


@NgModule({
  declarations: [PanelComponent],
  providers:[],
  imports: [
    CommonModule,
    PanelAdminRoutingModule,
    SharedModule,
    PipesModule
  ]
})
export class PanelAdminModule { }
