import { TestBed, inject } from '@angular/core/testing';

import { SearchPanelService } from './search-panel.service';

describe('SearchPanelService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchPanelService]
    });
  });

  it('should be created', inject([SearchPanelService], (service: SearchPanelService) => {
    expect(service).toBeTruthy();
  }));
});
