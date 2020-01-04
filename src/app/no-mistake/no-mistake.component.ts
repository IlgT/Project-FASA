import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Store } from '@ngrx/store';
import * as fromApp from '../stateManagement/app.reducer';
import * as ExpenseActions from '../expenseTracker/stateManagement/expense.action';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-no-mistake',
  templateUrl: './no-mistake.component.html',
  styleUrls: ['./no-mistake.component.css']
})
export class NoMistakeComponent implements OnInit, OnDestroy {
  expenseDetails: string;
  expenseSubscription: Subscription;

  constructor(private store: Store<fromApp.AppState>,
    public dialogRef: MatDialogRef<NoMistakeComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

    
    ngOnInit() {
      this.expenseDetails = "";
      this.expenseSubscription = this.store.select('expense')
        .subscribe(expenseState => {this.expenseDetails += expenseState.expenses[this.data.index].id;
                                    this.expenseDetails += " - ";
                                    this.expenseDetails += expenseState.expenses[this.data.index].reason;
                                    this.expenseDetails += " im Wert von ";
                                    this.expenseDetails += expenseState.expenses[this.data.index].amount.value;
                                    this.expenseDetails += expenseState.expenses[this.data.index].amount.currency;})
    }

    onYesClick(): void {
      this.store.dispatch(new ExpenseActions.DeleteExpense());
      this.dialogRef.close();
    }
    
    onNoClick(): void {
      this.store.dispatch(new ExpenseActions.DeleteExpenseCanceled());
      this.dialogRef.close();
    }

    ngOnDestroy() {
      this.expenseSubscription.unsubscribe();
    }
}
