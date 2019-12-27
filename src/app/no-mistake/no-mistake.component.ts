import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromApp from '../stateManagement/app.reducer';
import * as ExpenseActions from '../expenseTracker/stateManagement/expense.action';

@Component({
  selector: 'app-no-mistake',
  templateUrl: './no-mistake.component.html',
  styleUrls: ['./no-mistake.component.css']
})
export class NoMistakeComponent implements OnInit {

  constructor(private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<NoMistakeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

    
    ngOnInit() {
    }

    onYesClick(): void {
      this.store.dispatch(new ExpenseActions.StartDeleteExpense(this.data.id));
      this.dialogRef.close();
    }
    
    onNoClick(): void {
      this.dialogRef.close();
    }
}
