import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';

@Component({
  selector: 'app-snackbar-user-feedback',
  templateUrl: './snackbar-user-feedback.component.html',
  styleUrls: ['./snackbar-user-feedback.component.css']
})
export class SnackbarUserFeedbackComponent implements OnInit {


  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: string) {
  }

  ngOnInit() {
  }

}
