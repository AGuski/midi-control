import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteOutputComponent } from './route-output.component';

describe('RouteOutputComponent', () => {
  let component: RouteOutputComponent;
  let fixture: ComponentFixture<RouteOutputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteOutputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteOutputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
