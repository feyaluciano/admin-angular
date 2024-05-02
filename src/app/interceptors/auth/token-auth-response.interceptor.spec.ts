import { TestBed } from '@angular/core/testing';

import { TokenAuthResponseInterceptor } from './token-auth-response.interceptor';

describe('TokenAuthResponseInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      TokenAuthResponseInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: TokenAuthResponseInterceptor = TestBed.inject(TokenAuthResponseInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
