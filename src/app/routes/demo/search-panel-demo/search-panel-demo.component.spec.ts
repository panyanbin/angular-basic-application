import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchPanelDemoComponent } from './search-panel-demo.component';

describe('SearchPanelDemoComponent', () => {
  let component: SearchPanelDemoComponent;
  let fixture: ComponentFixture<SearchPanelDemoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchPanelDemoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchPanelDemoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
