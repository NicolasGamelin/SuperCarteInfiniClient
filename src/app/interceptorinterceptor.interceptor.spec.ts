import { TestBed } from '@angular/core/testing';

import { InterceptorinterceptorInterceptor } from './interceptorinterceptor.interceptor';

describe('InterceptorinterceptorInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      InterceptorinterceptorInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: InterceptorinterceptorInterceptor = TestBed.inject(InterceptorinterceptorInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
