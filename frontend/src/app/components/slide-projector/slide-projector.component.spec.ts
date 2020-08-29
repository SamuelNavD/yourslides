import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SlideProjectorComponent } from './slide-projector.component';

describe('SlideProjectorComponent', () => {
  let component: SlideProjectorComponent;
  let fixture: ComponentFixture<SlideProjectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SlideProjectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SlideProjectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
