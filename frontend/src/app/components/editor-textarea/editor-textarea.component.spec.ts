import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditorTextareaComponent } from './editor-textarea.component';

describe('EditorTextareaComponent', () => {
  let component: EditorTextareaComponent;
  let fixture: ComponentFixture<EditorTextareaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditorTextareaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorTextareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
