/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';

describe('Service: Auth', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AuthService,HttpClient],
      imports: [HttpClientModule]
    });
  });

  it('should ...', inject([AuthService,HttpClient], (service: AuthService) => {
    expect(service).toBeTruthy();
  }));
});
