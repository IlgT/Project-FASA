import { Component, OnInit } from '@angular/core';
import { Expense } from '../../expense';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import * as fromExpense from '../stateManagement/expense.reducer';
import * as fromApp from '../../stateManagement/app.reducer';

@Component({
  selector: 'expensesSubDlg',
  templateUrl: './expenses.component.html',
  styleUrls: ['./expenses.component.css']
})
export class ExpensesComponent implements OnInit {
  headers: string[] = ["id", "value", "reason", "date", "exchangeValue", "exchangeRate", "tag"];

  expenseState: fromExpense.ExpenseState;
  expenses: Expense[];
  //subscription: Subscription;

  constructor(private store: Store<fromApp.AppState>) {}

  ngOnInit() {
    //this.subscription = 
    this.store.select('expense').subscribe(
      (expenseState: fromExpense.ExpenseState) => this.expenseState = expenseState);
    this.expenses = this.expenseState.expenses
  }

  /** Gets the total cost of all expenses. */
  getTotalCost() {
    return this.expenses.map(expense => expense.amount.value).reduce((acc, value) => acc + value, 0);
  }

  ngOnDestroy() {
    //this.subscription.unsubscribe();
  }

}