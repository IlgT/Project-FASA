import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers/app.reducers';
import { ExpenseActions } from 'src/app/expenseTracker/action-types';
import { expenseNoMistake } from 'src/app/expenseTracker/expense.selectors';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-no-mistake',
  templateUrl: './no-mistake.component.html',
  styleUrls: ['./no-mistake.component.css']
})
export class NoMistakeComponent implements OnInit {
  expenseDetails$: Observable<string>;

  constructor(private store: Store<AppState>,
    public dialogRef: MatDialogRef<NoMistakeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

    
    ngOnInit() {
      this.expenseDetails$ = this.store.select(expenseNoMistake);
    }

    onYesClick(): void {
      this.store.dispatch(ExpenseActions.deleteExpense());
      this.dialogRef.close();
    }
    
    onNoClick(): void {
      this.store.dispatch(ExpenseActions.deleteExpenseCanceled());
      this.dialogRef.close();
    }
}
