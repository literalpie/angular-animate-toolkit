import { TestBed, inject } from '@angular/core/testing';

import { AnimationLocationsService } from './animation-locations.service';

describe('AnimationLocationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AnimationLocationsService]
    });
  });

  it('should be created', inject([AnimationLocationsService], (service: AnimationLocationsService) => {
    expect(service).toBeTruthy();
  }));
});
