import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleControlModuleComponent } from './single-control-module.component';

describe('SingleControlModuleComponent', () => {
  let component: SingleControlModuleComponent;
  let fixture: ComponentFixture<SingleControlModuleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleControlModuleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleControlModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
