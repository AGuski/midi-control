import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteInputComponent } from './route-input.component';

describe('RouteInputComponent', () => {
  let component: RouteInputComponent;
  let fixture: ComponentFixture<RouteInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
