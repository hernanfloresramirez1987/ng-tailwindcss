import { TestBed } from '@angular/core/testing';

import { ClasicService } from './clasic.service';

describe('ClasicService', () => {
  let service: ClasicService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ClasicService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
