import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoMistakeComponent } from './no-mistake.component';

describe('NoMistakeComponent', () => {
  let component: NoMistakeComponent;
  let fixture: ComponentFixture<NoMistakeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoMistakeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoMistakeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
