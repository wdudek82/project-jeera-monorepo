import { TestBed } from '@angular/core/testing';

import { TicketsResolver } from './tickets.resolver';

describe('TicketsResolver', () => {
  let resolver: TicketsResolver;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    resolver = TestBed.inject(TicketsResolver);
  });

  it('should be created', () => {
    expect(resolver).toBeTruthy();
  });
});
