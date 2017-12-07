import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchUrlComponent } from './search-url.component';

describe('SearchUrlComponent', () => {
  let component: SearchUrlComponent;
  let fixture: ComponentFixture<SearchUrlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearchUrlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearchUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
