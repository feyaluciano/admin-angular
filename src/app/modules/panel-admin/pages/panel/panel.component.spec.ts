/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PanelComponent } from './panel.component';
import { MenuIzquierdaComponent } from 'src/app/layouts/menu-izquierda/menu-izquierda.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from 'src/app/layouts/header/header.component';
import { SharedModule } from 'src/app/shared/shared/shared.module';
import { DateTimeInfoComponent } from 'src/app/shared/components/date-time-info/date-time-info.component';
describe('PanelComponent', () => {
  let component: PanelComponent;
  let fixture: ComponentFixture<PanelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelComponent,MenuIzquierdaComponent ,HeaderComponent,DateTimeInfoComponent],
      imports: [HttpClientModule,SharedModule]

    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
