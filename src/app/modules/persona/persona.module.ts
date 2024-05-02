import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PersonaListComponent } from './pages/persona-list/persona-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { PersonaEditComponent } from './pages/persona-edit/persona-edit.component';
import { PersonaRoutingModule } from './persona-routing.module';


@NgModule({
  declarations: [PersonaListComponent,PersonaEditComponent],
  imports: [
    CommonModule,
    FormsModule, 
    SharedModule, 
    PersonaRoutingModule,    
    NgxPaginationModule,
    NgxSkeletonLoaderModule.forRoot({ animation: 'pulse', loadingText: 'This item is actually loading...' }),      
    ReactiveFormsModule,     
    NgSelectModule          
  ]
})
export class PersonaModule { }
