import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SnackbarUserFeedbackComponent } from './snackbar-user-feedback.component';

describe('SnackbarUserFeedbackComponent', () => {
  let component: SnackbarUserFeedbackComponent;
  let fixture: ComponentFixture<SnackbarUserFeedbackComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SnackbarUserFeedbackComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnackbarUserFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
