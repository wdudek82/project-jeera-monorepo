import { TestBed } from '@angular/core/testing';

import { SignedInUserResolver } from './signed-in-user.resolver';

describe('SignedInUserResolver', () => {
  let resolver: SignedInUserResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(SignedInUserResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
