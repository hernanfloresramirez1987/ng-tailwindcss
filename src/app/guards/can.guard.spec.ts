import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { canGuard } from './can.guard';

describe('canGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => canGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
