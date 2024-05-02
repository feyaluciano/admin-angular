/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { ModalAlertComponent } from './modal-alert.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

describe('ModalAlertComponent', () => {
  let component: ModalAlertComponent;
  let fixture: ComponentFixture<ModalAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModalAlertComponent ],
      providers:[NgbActiveModal]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
