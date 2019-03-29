/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { GetMeteorsService } from './get-meteors.service';

describe('Service: GetMeteors', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GetMeteorsService]
    });
  });

  it('should ...', inject([GetMeteorsService], (service: GetMeteorsService) => {
    expect(service).toBeTruthy();
  }));
});
